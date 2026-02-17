import LanguageSelector from './LanguageSelector';

type HomeFooterProps = {
  title: string;
  description: string;
};

export default function HomeFooter({ title, description }: HomeFooterProps) {
  return (
    <footer className="mt-auto border-t border-gray-20 bg-gray-10 px-5 pb-24 pt-5">
      <h2 className="text-title-small text-gray-100">{title}</h2>
      <p className="mt-2 text-body-small text-gray-80">{description}</p>
      <LanguageSelector className="mt-4" />
    </footer>
  );
}
