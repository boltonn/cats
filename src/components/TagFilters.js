
const TagFilters = ({ title, tags, onChange }) => {
    return (
        <div className="border-hidden">
            <span className="text-xs font-bold pl-2 text-slate-700">{title}</span>
            <div className="flex flex-wrap text-[8px] items-center font-bold px-1 pt-1.5 space-y-1 overflow-hidden">
                {tags.map((tag, i) => (
                    <span 
                        key={i} 
                        className="px-1 bg-cyan-100 text-cyan-800 font-medium mr-2 rounded hover:cursor-pointer" 
                        onClick={() => onChange(tag)}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagFilters;