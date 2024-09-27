/**
 * 레거시 코드, 혹시 모르니 주석으로 남겨놓아요
 */

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useCallback,
//   useEffect,
//   useMemo,
// } from 'react';
// import * as styles from './Filter.css';

// interface FilterState {
//   [key: string]: string;
// }

// interface FilterContextType {
//   id: string;
//   filters: FilterState;
//   keyword: string;
//   setFilter: (key: string, value: string) => void;
//   setKeyword: (value: string) => void;
//   resetFilters: () => void;
//   resetKeyword: () => void;
//   controlledFilterLength: number;
// }

// const FilterContext = createContext<FilterContextType | undefined>(undefined);

// interface FilterProviderProps {
//   children: React.ReactNode;
//   defaultValues: FilterState;
//   id: string;
// }

// const getStorageKey = (id: string) => `filters_${id}`;

// const getStoredFilters = (
//   id: string,
//   defaultValues: FilterState,
// ): FilterState => {
//   const storedFilters = localStorage.getItem(getStorageKey(id));
//   if (storedFilters) {
//     const parsedFilters = JSON.parse(storedFilters);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { search, ...otherFilters } = parsedFilters;
//     return otherFilters;
//   }
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { search, ...otherDefaults } = defaultValues;
//   return otherDefaults;
// };

// export const FilterProvider: React.FC<FilterProviderProps> = ({
//   children,
//   defaultValues,
//   id,
// }) => {
//   const [filters, setFilters] = useState<FilterState>(() =>
//     getStoredFilters(id, defaultValues),
//   );
//   const [keyword, setKeyword] = useState('');

//   useEffect(() => {
//     localStorage.setItem(getStorageKey(id), JSON.stringify(filters));
//   }, [id, filters]);

//   const setFilter = useCallback(
//     (key: string, value: string) => {
//       setFilters((prev) => {
//         const newFilters = { ...prev, [key]: value };
//         localStorage.setItem(getStorageKey(id), JSON.stringify(newFilters));
//         return newFilters;
//       });
//     },
//     [id],
//   );

//   const resetFilters = useCallback(() => {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { search, ...otherDefaults } = defaultValues;
//     setFilters(otherDefaults);
//     localStorage.setItem(getStorageKey(id), JSON.stringify(otherDefaults));
//   }, [defaultValues, id]);

//   const resetKeyword = useCallback(() => {
//     setKeyword('');
//   }, []);

//   const controlledFilterLength = Object.entries(filters).reduce(
//     (count, [key, value]) => (value !== defaultValues[key] ? count + 1 : count),
//     0,
//   );

//   const value = useMemo(
//     () => ({
//       id,
//       filters,
//       keyword,
//       setFilter,
//       setKeyword,
//       resetFilters,
//       resetKeyword,
//       controlledFilterLength,
//     }),
//     [id, filters, keyword, controlledFilterLength],
//   );

//   return (
//     <FilterContext.Provider value={value}>
//       <div css={styles.composeLayout} data-vaul-drawer-wrapper="true">
//         {children}
//       </div>
//     </FilterContext.Provider>
//   );
// };

// export const useFilters = () => {
//   const context = useContext(FilterContext);
//   if (context === undefined) {
//     throw new Error('useFilters must be used within a FilterProvider');
//   }
//   return context;
// };
