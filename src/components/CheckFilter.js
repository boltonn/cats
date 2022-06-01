
const CheckFilter = ({ trueFilter, falseFilter, filter, onChange }) => {

    // make it so you cant select both (mutually exclusive) but auto changes to other if one is selected
    
    const posChange = (filter) => {
        if (filter === false | filter === null) {
            onChange(true);
        } else {
            onChange(null);
        }
    };

    const negChange = (filter) => {
        if (filter === true | filter === null) {
            onChange(false);
        } else {
            onChange(null);
        }
    };

    return (
        <div className="flex mx-3">
            <div>
                <div className="form-check">
                    <input
                        id="checkbox-true"
                        type="checkbox"
                        value=""
                        className="form-check-input w-3 h-3 border-slate-300 rounded text-cyan-300
                        dark:accent-cyan-600 focus:ring-transparent transition duration-200 cursor-pointer"
                        checked={filter===true}
                        onChange={() => posChange(filter)}
                    />
                    <label
                        className="form-check-label inline-block text-slate-800 dark:text-white text-xs pl-1"
                        htmlFor="checkbox-true"
                    >
                        {trueFilter}
                    </label>
                </div>
                <div className="form-check">
                    <input
                        id="checkbox-false"
                        type="checkbox"
                        value=""
                        className="form-check-input w-3 h-3 border-slate-300 rounded text-cyan-300 
                        dark:accent-cyan-600 focus:ring-transparent transition duration-200 cursor-pointer"
                        checked={filter===false}
                        onChange={() => negChange(filter)}
                    />
                    <label
                        className="form-check-label inline-block text-slate-800 dark:text-white text-xs pl-1"
                        htmlFor="checkbox-false"
                    >
                        {falseFilter}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default CheckFilter;