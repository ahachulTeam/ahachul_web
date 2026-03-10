import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type TouchEvent,
} from 'react';

import {
  SEOUL_METRO_MAP_POINTS,
  SEOUL_METRO_STATION_EN_LABELS,
  SEOUL_METRO_MAP_VIEWBOX,
  SEOUL_METRO_SVG_LINES,
  findSeoulMetroLineMeta,
  findSeoulMetroMapStationEntries,
  hasSeoulMetroMapStation,
  type SeoulMetroMapLocale,
  type SeoulMetroSvgLineDef,
  type SeoulMetroSvgStationDef,
} from './SeoulMetroMapViewer.data';

type SubwayLineCatalogStation = {
  id: number;
  name: string;
};

export type SeoulMetroMapCatalogLine = {
  id: number;
  name: string;
  stations: SubwayLineCatalogStation[];
};

type StationLineMeta = {
  subwayLineId: number;
  nameKo: string;
  nameEn: string;
  color: string;
  code: string;
  stationId: number;
};

export type SeoulMetroMapStationSelection = {
  stationId: number;
  subwayLineId: number;
  stationName: string;
  lines: StationLineMeta[];
};

export type SeoulMetroMapStationGuide = {
  stationNameLocalized: string;
  lineNameLocalized: string;
  romanizedName?: string;
  pronunciation?: string;
};

interface SeoulMetroMapViewerProps {
  subwayLines: SeoulMetroMapCatalogLine[];
  initialLocale?: SeoulMetroMapLocale;
  mapTitle?: string;
  mapDescription?: string;
  openSelectedStationLabel?: string;
  debugHotspots?: boolean;
  loadStationGuide?: (
    station: Pick<SeoulMetroMapStationSelection, 'stationId' | 'subwayLineId' | 'stationName'>,
    locale: SeoulMetroMapLocale,
  ) => Promise<SeoulMetroMapStationGuide | null>;
  onOpenSelectedStation?: (station: SeoulMetroMapStationSelection) => void;
}

type RenderedStationNode = {
  key: string;
  stationName: string;
  stationDef: SeoulMetroSvgStationDef;
  x: number;
  y: number;
  lines: Array<{
    code: string;
    color: string;
    nameKo: string;
    nameEn: string;
  }>;
};

type Point = {
  x: number;
  y: number;
};

const MAP_WIDTH = SEOUL_METRO_MAP_VIEWBOX.width;
const MAP_HEIGHT = SEOUL_METRO_MAP_VIEWBOX.height;
const MAX_SCALE = 3.5;
const MIN_SCALE = 0.42;
const VIEWPORT_PADDING = 18;
const SHARED_SEGMENT_SPACING = 10;
const MANUAL_POINT_OFFSETS: Record<string, Record<string, Point>> = {};

const baseButtonStyle: CSSProperties = {
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  font: 'inherit',
};

function createCatalog(lines: SeoulMetroMapCatalogLine[]) {
  const map = new Map<string, SeoulMetroMapStationSelection>();

  lines.forEach(line => {
    const fallbackMeta =
      findSeoulMetroLineMeta(line.id) ??
      findSeoulMetroLineMeta(line.name) ??
      SEOUL_METRO_SVG_LINES.find(svgLine => svgLine.code === String(line.id));
    const color = fallbackMeta?.color ?? '#334155';
    const lineCode = fallbackMeta?.code ?? String(line.id);
    const lineNameEn = fallbackMeta?.nameEn ?? line.name;
    const lineNameKo = fallbackMeta?.nameKo ?? line.name;

    line.stations.forEach(station => {
      if (!hasSeoulMetroMapStation(station.name)) {
        return;
      }

      const key = station.name
        .replace(/\([^)]*\)/g, '')
        .replace(/역$/, '')
        .trim();
      const existing = map.get(key);
      const lineInfo: StationLineMeta = {
        subwayLineId: line.id,
        nameKo: lineNameKo,
        nameEn: lineNameEn,
        color,
        code: lineCode,
        stationId: station.id,
      };

      if (!existing) {
        map.set(key, {
          stationId: station.id,
          subwayLineId: line.id,
          stationName: key,
          lines: [lineInfo],
        });
        return;
      }

      if (!existing.lines.some(item => item.code === lineCode)) {
        existing.lines.push(lineInfo);
      }
    });
  });

  return Array.from(map.values()).sort((a, b) => a.stationName.localeCompare(b.stationName, 'ko'));
}

function clampTransform(
  next: { x: number; y: number; scale: number },
  viewport: { width: number; height: number },
  bounds: { minX: number; minY: number; maxX: number; maxY: number },
) {
  const scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, next.scale));
  const scaledWidth = (bounds.maxX - bounds.minX) * scale;
  const scaledHeight = (bounds.maxY - bounds.minY) * scale;

  if (!viewport.width || !viewport.height) {
    return { ...next, scale };
  }

  if (scaledWidth <= viewport.width && scaledHeight <= viewport.height) {
    return {
      x: (viewport.width - scaledWidth) / 2 - bounds.minX * scale,
      y: (viewport.height - scaledHeight) / 2 - bounds.minY * scale,
      scale,
    };
  }

  const minX = viewport.width - VIEWPORT_PADDING - bounds.maxX * scale;
  const maxX = VIEWPORT_PADDING - bounds.minX * scale;
  const minY = viewport.height - VIEWPORT_PADDING - bounds.maxY * scale;
  const maxY = VIEWPORT_PADDING - bounds.minY * scale;

  return {
    x: Math.max(minX, Math.min(maxX, next.x)),
    y: Math.max(minY, Math.min(maxY, next.y)),
    scale,
  };
}

function getStationLabel(stationDef: SeoulMetroSvgStationDef, locale: SeoulMetroMapLocale) {
  if (locale === 'en') {
    return stationDef.en ?? SEOUL_METRO_STATION_EN_LABELS[stationDef.n] ?? stationDef.n;
  }

  return stationDef.n;
}

function buildRenderedStationNodes(lines: readonly SeoulMetroSvgLineDef[]) {
  const map = new Map<string, RenderedStationNode>();

  lines.forEach(line => {
    line.stations.forEach(station => {
      const point = SEOUL_METRO_MAP_POINTS[station.k];
      const existing = map.get(station.n);
      const lineInfo = {
        code: line.code,
        color: line.color,
        nameKo: line.nameKo,
        nameEn: line.nameEn,
      };

      if (!existing) {
        map.set(station.n, {
          key: station.n,
          stationName: station.n,
          stationDef: station,
          x: point[0],
          y: point[1],
          lines: [lineInfo],
        });
        return;
      }

      if (!existing.lines.some(item => item.code === line.code)) {
        existing.lines.push(lineInfo);
      }
    });
  });

  return Array.from(map.values());
}

function getContentBounds(lines: readonly SeoulMetroSvgLineDef[]) {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  lines.forEach(line => {
    line.paths.forEach(points => {
      points.forEach(([x, y]) => {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });
    });
  });

  return {
    minX: Math.max(0, minX - 44),
    minY: Math.max(0, minY - 44),
    maxX: Math.min(MAP_WIDTH, maxX + 44),
    maxY: Math.min(MAP_HEIGHT, maxY + 44),
  };
}

function getLineBadgeLabel(code: string) {
  if (/^\d+$/.test(code)) {
    return code;
  }

  if (code === 'shinbundang') {
    return 'SB';
  }

  if (code === 'gyeongui-jungang') {
    return 'GJ';
  }

  return code.slice(0, 2).toUpperCase();
}

function buildPointKey(point: readonly [number, number]) {
  return `${point[0]},${point[1]}`;
}

function buildSharedSegmentOffsets(lines: readonly SeoulMetroSvgLineDef[]) {
  const groups = new Map<
    string,
    Array<{
      lineIndex: number;
      pathIndex: number;
      segmentIndex: number;
      a: readonly [number, number];
      b: readonly [number, number];
    }>
  >();

  lines.forEach((line, lineIndex) => {
    line.paths.forEach((points, pathIndex) => {
      for (let segmentIndex = 0; segmentIndex < points.length - 1; segmentIndex += 1) {
        const a = points[segmentIndex];
        const b = points[segmentIndex + 1];
        const key = [buildPointKey(a), buildPointKey(b)].sort().join('|');
        const current = groups.get(key) ?? [];
        current.push({ lineIndex, pathIndex, segmentIndex, a, b });
        groups.set(key, current);
      }
    });
  });

  const offsets = new Map<string, Point>();

  groups.forEach(entries => {
    const lineIndexes = Array.from(new Set(entries.map(entry => entry.lineIndex))).sort(
      (a, b) => a - b,
    );
    if (lineIndexes.length <= 1) {
      return;
    }

    const [firstKey, secondKey] = [buildPointKey(entries[0].a), buildPointKey(entries[0].b)].sort();
    const [ax, ay] = firstKey.split(',').map(Number);
    const [bx, by] = secondKey.split(',').map(Number);
    const dx = bx - ax;
    const dy = by - ay;
    const length = Math.hypot(dx, dy);

    if (length === 0) {
      return;
    }

    const nx = -dy / length;
    const ny = dx / length;

    lineIndexes.forEach((lineIndex, rank) => {
      const scalar = (rank - (lineIndexes.length - 1) / 2) * SHARED_SEGMENT_SPACING;
      entries
        .filter(entry => entry.lineIndex === lineIndex)
        .forEach(entry => {
          offsets.set(`${lineIndex}:${entry.pathIndex}:${entry.segmentIndex}`, {
            x: nx * scalar,
            y: ny * scalar,
          });
        });
    });
  });

  return offsets;
}

function buildAdjustedPolylinePoints(
  points: readonly (readonly [number, number])[],
  lineCode: string,
  lineIndex: number,
  pathIndex: number,
  sharedSegmentOffsets: Map<string, Point>,
) {
  return points.map((point, pointIndex) => {
    const prevOffset =
      pointIndex > 0
        ? (sharedSegmentOffsets.get(`${lineIndex}:${pathIndex}:${pointIndex - 1}`) ?? {
            x: 0,
            y: 0,
          })
        : { x: 0, y: 0 };
    const nextOffset =
      pointIndex < points.length - 1
        ? (sharedSegmentOffsets.get(`${lineIndex}:${pathIndex}:${pointIndex}`) ?? { x: 0, y: 0 })
        : { x: 0, y: 0 };

    const offset =
      pointIndex === 0
        ? nextOffset
        : pointIndex === points.length - 1
          ? prevOffset
          : {
              x: (prevOffset.x + nextOffset.x) / 2,
              y: (prevOffset.y + nextOffset.y) / 2,
            };

    const manualOffset = MANUAL_POINT_OFFSETS[lineCode]?.[buildPointKey(point)] ?? { x: 0, y: 0 };

    return [point[0] + offset.x + manualOffset.x, point[1] + offset.y + manualOffset.y] as const;
  });
}

function resolveFallbackSelection(node: RenderedStationNode): SeoulMetroMapStationSelection {
  const lines = node.lines.map(line => ({
    subwayLineId: findSeoulMetroLineMeta(line.code)?.subwayLineId ?? 0,
    nameKo: line.nameKo,
    nameEn: line.nameEn,
    color: line.color,
    code: line.code,
    stationId: 0,
  }));

  return {
    stationId: 0,
    subwayLineId: lines[0]?.subwayLineId ?? 0,
    stationName: node.stationName,
    lines,
  };
}

export function SeoulMetroMapViewer({
  subwayLines,
  initialLocale = 'ko',
  mapTitle = '서울 지하철 노선도',
  debugHotspots = false,
}: SeoulMetroMapViewerProps) {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(
    null,
  );
  const pinchRef = useRef<{ startDistance: number; baseScale: number } | null>(null);
  const fitScaleRef = useRef(MIN_SCALE);

  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: MIN_SCALE });
  const [selectedStation, setSelectedStation] = useState<SeoulMetroMapStationSelection | null>(
    null,
  );

  const stationCatalog = useMemo(() => createCatalog(subwayLines), [subwayLines]);
  const stationCatalogMap = useMemo(
    () => new Map(stationCatalog.map(station => [station.stationName, station])),
    [stationCatalog],
  );
  const renderedStations = useMemo(() => buildRenderedStationNodes(SEOUL_METRO_SVG_LINES), []);
  const contentBounds = useMemo(() => getContentBounds(SEOUL_METRO_SVG_LINES), []);
  const sharedSegmentOffsets = useMemo(() => buildSharedSegmentOffsets(SEOUL_METRO_SVG_LINES), []);
  const mapLocale = initialLocale;

  const fitToViewport = useCallback(() => {
    if (!viewerRef.current) {
      return;
    }

    const nextViewport = {
      width: viewerRef.current.clientWidth,
      height: viewerRef.current.clientHeight,
    };
    const fitMultiplier = nextViewport.width < 640 ? 1.28 : 1.12;
    const fitScale = Math.max(
      MIN_SCALE,
      Math.min(
        (nextViewport.width - VIEWPORT_PADDING * 2) / (contentBounds.maxX - contentBounds.minX),
        (nextViewport.height - VIEWPORT_PADDING * 2) / (contentBounds.maxY - contentBounds.minY),
      ) * fitMultiplier,
    );

    fitScaleRef.current = fitScale;
    setViewport(nextViewport);
    setTransform(
      clampTransform(
        {
          x:
            (nextViewport.width - (contentBounds.maxX - contentBounds.minX) * fitScale) / 2 -
            contentBounds.minX * fitScale,
          y:
            (nextViewport.height - (contentBounds.maxY - contentBounds.minY) * fitScale) / 2 -
            contentBounds.minY * fitScale,
          scale: fitScale,
        },
        nextViewport,
        contentBounds,
      ),
    );
  }, [contentBounds]);

  useEffect(() => {
    fitToViewport();
    const current = viewerRef.current;
    if (!current || typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver(() => fitToViewport());
    observer.observe(current);
    return () => observer.disconnect();
  }, [fitToViewport]);

  const centerStation = useCallback(
    (station: SeoulMetroMapStationSelection) => {
      const entry = findSeoulMetroMapStationEntries(station.stationName)[0];
      if (!entry || !viewport.width || !viewport.height) {
        return;
      }

      const nextScale = Math.max(transform.scale, fitScaleRef.current * 1.9);
      setTransform(
        clampTransform(
          {
            x: viewport.width / 2 - entry.point[0] * nextScale,
            y: viewport.height / 2 - entry.point[1] * nextScale,
            scale: nextScale,
          },
          viewport,
          contentBounds,
        ),
      );
    },
    [contentBounds, transform.scale, viewport],
  );

  const handleSelectStation = useCallback(
    (node: RenderedStationNode) => {
      const station = stationCatalogMap.get(node.stationName) ?? resolveFallbackSelection(node);
      setSelectedStation(station);
      centerStation(station);
    },
    [centerStation, stationCatalogMap],
  );

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      baseX: transform.x,
      baseY: transform.y,
    };
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current) {
      return;
    }

    setTransform(current =>
      clampTransform(
        {
          ...current,
          x: dragRef.current!.baseX + (event.clientX - dragRef.current!.startX),
          y: dragRef.current!.baseY + (event.clientY - dragRef.current!.startY),
        },
        viewport,
        contentBounds,
      ),
    );
  };

  const handleMouseUp = () => {
    dragRef.current = null;
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      const [first, second] = Array.from(event.touches);
      pinchRef.current = {
        startDistance: Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY),
        baseScale: transform.scale,
      };
      return;
    }

    const [touch] = Array.from(event.touches);
    if (!touch) {
      return;
    }

    dragRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      baseX: transform.x,
      baseY: transform.y,
    };
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2 && pinchRef.current) {
      const [first, second] = Array.from(event.touches);
      const distance = Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
      const nextScale = pinchRef.current.baseScale * (distance / pinchRef.current.startDistance);
      setTransform(current =>
        clampTransform({ ...current, scale: nextScale }, viewport, contentBounds),
      );
      return;
    }

    if (!dragRef.current) {
      return;
    }

    const [touch] = Array.from(event.touches);
    if (!touch) {
      return;
    }

    setTransform(current =>
      clampTransform(
        {
          ...current,
          x: dragRef.current!.baseX + (touch.clientX - dragRef.current!.startX),
          y: dragRef.current!.baseY + (touch.clientY - dragRef.current!.startY),
        },
        viewport,
        contentBounds,
      ),
    );
  };

  const handleTouchEnd = () => {
    dragRef.current = null;
    pinchRef.current = null;
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const nextScale = transform.scale + (event.deltaY > 0 ? -0.08 : 0.08);
    setTransform(current =>
      clampTransform({ ...current, scale: nextScale }, viewport, contentBounds),
    );
  };

  const selectedStationLabel =
    selectedStation == null
      ? null
      : mapLocale === 'en'
        ? (SEOUL_METRO_STATION_EN_LABELS[selectedStation.stationName] ??
          selectedStation.stationName)
        : selectedStation.stationName;
  const selectedStationLines =
    selectedStation?.lines.map(line => (mapLocale === 'en' ? line.nameEn : line.nameKo)) ?? [];

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        minHeight: '100dvh',
        overflow: 'hidden',
        background: '#FFFFFF',
      }}
    >
      <div
        ref={viewerRef}
        aria-label={mapTitle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          touchAction: 'none',
          cursor: dragRef.current ? 'grabbing' : 'grab',
          overscrollBehavior: 'contain',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0',
          }}
        >
          <svg
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            style={{ display: 'block', width: MAP_WIDTH, height: MAP_HEIGHT, overflow: 'visible' }}
          >
            <rect x={0} y={0} width={MAP_WIDTH} height={MAP_HEIGHT} fill="#FFFFFF" rx={24} />
            <path
              d="M-48 176 C48 214, 102 294, 178 318 C242 340, 332 304, 402 338 C470 370, 566 426, 640 412 C726 396, 798 306, 890 334"
              fill="none"
              stroke="rgba(126, 180, 213, 0.32)"
              strokeWidth={34}
              strokeLinecap="round"
            />

            {SEOUL_METRO_SVG_LINES.map((line, lineIndex) =>
              line.paths.map((points, index) => (
                <g key={`${line.id}-${index}`}>
                  <polyline
                    points={buildAdjustedPolylinePoints(
                      points,
                      line.code,
                      lineIndex,
                      index,
                      sharedSegmentOffsets,
                    )
                      .map(point => point.join(','))
                      .join(' ')}
                    fill="none"
                    stroke={line.color}
                    strokeWidth={line.w * 0.55}
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit={10}
                  />
                </g>
              )),
            )}

            {renderedStations.map(node => {
              const isSelected = Boolean(
                selectedStation && node.stationName === selectedStation.stationName,
              );
              const isTransfer = node.stationDef.t || node.lines.length > 1;
              const label = getStationLabel(node.stationDef, mapLocale);
              const labelX = node.x + (node.stationDef.labelDx ?? 0);
              const labelY = node.y + (node.stationDef.labelDy ?? (isTransfer ? 21 : 18));
              const textAnchor = node.stationDef.labelAnchor ?? 'middle';

              return (
                <g
                  key={node.key}
                  onClick={() => handleSelectStation(node)}
                  style={{ cursor: 'pointer' }}
                >
                  {isTransfer ? (
                    <>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={6.2}
                        fill="#FFFFFF"
                        stroke="#737980"
                        strokeWidth={1.5}
                      />
                      <circle cx={node.x} cy={node.y} r={1.8} fill="#737980" />
                    </>
                  ) : (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={4.3}
                      fill="#FFFFFF"
                      stroke={node.lines[0]?.color ?? '#475569'}
                      strokeWidth={2.1}
                    />
                  )}

                  {isSelected ? (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isTransfer ? 12 : 9}
                      fill="none"
                      stroke="rgba(17,24,39,0.88)"
                      strokeWidth={1.8}
                      opacity={0.92}
                    />
                  ) : null}

                  {debugHotspots ? (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={18}
                      fill="rgba(15,23,42,0.12)"
                      pointerEvents="none"
                    />
                  ) : null}

                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor={textAnchor}
                    fontSize={isTransfer ? 9 : 8}
                    fontWeight={isTransfer ? 700 : 500}
                    fill="rgba(31,41,55,0.92)"
                    stroke="rgba(255,255,255,0.96)"
                    strokeWidth={1.7}
                    paintOrder="stroke"
                    style={{ pointerEvents: 'none' }}
                  >
                    {label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div
          style={{
            position: 'absolute',
            right: 14,
            bottom: selectedStationLabel ? 82 : 14,
            display: 'grid',
            gap: 8,
            zIndex: 2,
          }}
        >
          <button
            type="button"
            onClick={() =>
              setTransform(current =>
                clampTransform(
                  { ...current, scale: current.scale + 0.12 },
                  viewport,
                  contentBounds,
                ),
              )
            }
            style={{
              ...baseButtonStyle,
              width: 40,
              height: 40,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.94)',
              color: '#111827',
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.14)',
              fontSize: 20,
              fontWeight: 700,
            }}
            aria-label="zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={() =>
              setTransform(current =>
                clampTransform(
                  { ...current, scale: current.scale - 0.12 },
                  viewport,
                  contentBounds,
                ),
              )
            }
            style={{
              ...baseButtonStyle,
              width: 40,
              height: 40,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.94)',
              color: '#111827',
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.14)',
              fontSize: 20,
              fontWeight: 700,
            }}
            aria-label="zoom out"
          >
            −
          </button>
          <button
            type="button"
            onClick={fitToViewport}
            style={{
              ...baseButtonStyle,
              minWidth: 40,
              height: 40,
              padding: '0 14px',
              borderRadius: 999,
              background: 'rgba(17,24,39,0.94)',
              color: '#FFFFFF',
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.2)',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '-0.01em',
            }}
          >
            FIT
          </button>
        </div>

        {selectedStationLabel ? (
          <div
            style={{
              position: 'absolute',
              left: 14,
              right: 64,
              bottom: 14,
              zIndex: 2,
              display: 'grid',
              gap: 8,
              padding: '14px 16px',
              borderRadius: 20,
              background: 'rgba(255,255,255,0.94)',
              color: '#111827',
              boxShadow: '0 16px 36px rgba(15, 23, 42, 0.16)',
              backdropFilter: 'blur(18px)',
            }}
          >
            <div style={{ display: 'grid', gap: 4 }}>
              <strong style={{ fontSize: 16, fontWeight: 900, letterSpacing: '-0.03em' }}>
                {selectedStationLabel}
              </strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {selectedStation?.lines.map(line => (
                  <span
                    key={`${selectedStation?.stationName ?? 'station'}-${line.code}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      borderRadius: 999,
                      padding: '6px 10px',
                      background: '#F3F4F6',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#111827',
                    }}
                  >
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 999,
                        background: line.color,
                        color: '#FFFFFF',
                        fontSize: 10,
                        fontWeight: 800,
                      }}
                    >
                      {getLineBadgeLabel(line.code)}
                    </span>
                    {mapLocale === 'en' ? line.nameEn : line.nameKo}
                  </span>
                ))}
              </div>
            </div>
            <span style={{ fontSize: 12, color: '#6B7280' }}>
              {selectedStationLines.join(' · ')}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
