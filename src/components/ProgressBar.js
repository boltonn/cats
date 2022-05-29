
const ProgressBar = ({ percentage, number }) => {
    return (
        <div className="flex items-center justify-center mt-4">
            <span className="text-sm font-medium text-blue-600">{number} star</span>
            <div className="w-1/2 h-5 mx-4 bg-slate-200 rounded">
                <div className="h-5 bg-cyan-400 rounded" style={{ width: `${percentage}` }}/>
            </div>
            <span className="text-sm font-medium text-blue-600">{percentage}</span>
        </div>
    );
};

export default ProgressBar;