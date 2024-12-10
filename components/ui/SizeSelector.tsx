interface SizeSelectorProps {
  onSizeSelect: (width: number, height: number) => void;
}

const sizePresets = [
  { id: 'small', width: 2, height: 2, label: '□' },
  { id: 'medium', width: 3, height: 2, label: '▭' },
  { id: 'large', width: 4, height: 2, label: '▭' },
  { id: 'xl', width: 6, height: 2, label: '▭' },
];

export const SizeSelector = ({ onSizeSelect }: SizeSelectorProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
      {sizePresets.map((preset) => (
        <button
          key={preset.id}
          onClick={() => onSizeSelect(preset.width, preset.height)}
          className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-100 transition-colors"
        >
          <span className="text-lg">{preset.label}</span>
        </button>
      ))}
    </div>
  );
};
