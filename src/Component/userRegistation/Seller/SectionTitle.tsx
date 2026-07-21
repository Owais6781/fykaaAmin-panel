

interface Props {
  title: string;
}

export default function SectionTitle({
  title,
}: Props) {
  return (
    <div className="mb-8">

      <h2 className="text-2xl font-bold text-[#0066e5]">
        {title}
      </h2>

      <div className="h-[2px] w-16 bg-[#0066e5] mt-2 rounded-full" />

    </div>
  );
}