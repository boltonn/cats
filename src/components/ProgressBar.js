
const ProgressBar = ({ percentage, number }) => {
    return (
        <div className="flex items-center justify-center mt-4">
            <span className="text-sm font-medium text-slate-600 dark:text-cyan-200">{number} star</span>
            <div className="w-1/2 h-5 mx-4 bg-slate-200 rounded">
                <div className="h-5 bg-cyan-400 rounded" style={{ width: `${percentage}` }}/>
            </div>
            {/* hack to get them to be the same length */}
            <span className="text-sm font-medium text-slate-600 dark:text-white whitespace-pre">{percentage.length ===5 ? percentage : '  '+percentage}</span>
        </div>
    );
};

export default ProgressBar;