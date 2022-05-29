
import TagFilters from "./TagFilters";
import Separator from "./Separator";
import CheckFilter from "./CheckFilter";
import { connect } from "react-redux";
import { setIsOnline, setIsInternal, addTagFilter, clearTagFilters, setProvider } from "../actions";

// TODO: filter by provider; overflow size

const Filters = (props) => {
    const clearFilters = () => {
        props.clearTagFilters();
        props.setIsOnline(null);
        props.setIsInternal(null);
        props.setProvider(null);
    }

    return (
        <div className="pl-2 my-6">
            {/* user can see what filters they've selected */}
            <div className="pl-2 mb-4">
                {((props.tagFilters.length === 0) && (props.isInternal === null) && (props.isOnline == null) && (props.provider === null)) 
                    ? <p className="font-bold pl-2 text-slate-700 mb-4">Filters</p>
                    : (
                        <div className="text-[10px]">
                            <span className="font-bold text-slate-900">
                                {props.tagFilters.length + (props.isInternal!==null)*1 + (props.isOnline!==null)*1 + (props.provider!==null)*1} Filter{(props.tagFilters.length + (props.isInternal!==null)*1 + (props.isOnline!==null)*1 + (props.provider!==null)*1) > 1 ? "s" : ""}
                            </span>
                            <div className="flex flex-wrap items-center text-slate-400">
                                {(props.isInternal === null)
                                    ? <div />
                                    : <span>{props.isInternal ? "Internal" : "External"}</span>
                                }
                                {(props.isOnline === null)
                                    ? <div />
                                    : (
                                        <div className="flex items-center">
                                            {props.isInternal === null ? <div /> : <span className="w-[.2em] h-[.2em] mx-1 bg-slate-400 rounded-full" />}
                                            <span>{props.isOnline ? "Online" : "In-person"}</span>
                                        </div>
                                    )
                                }
                                {props.tagFilters.map((tagFilter, index) => {
                                    return (
                                        <div key={index} className="flex items-center">
                                            { ((props.isInternal === null) && (props.isOnline === null) && (index === 0)) 
                                                ? <div /> 
                                                : <span className="w-[.2em] h-[.2em] mx-1 bg-slate-400 rounded-full" /> 
                                            }
                                            <span>{tagFilter}</span>
                                        </div>
                                    );
                                })}
                                {(props.provider === null)
                                    ? <div />
                                    : (
                                        <div className="flex items-center">
                                            {((props.isInternal === null) && (props.isOnline === null) && (props.tagFilters.length === 0))
                                                ? <div />
                                                : <span className="w-[.2em] h-[.2em] mx-1 bg-slate-400 rounded-full" />
                                            }
                                            <span>{props.provider}</span>
                                        </div>
                                    )
                                }
                            </div>
                            <span 
                                className="text-cyan-400 hover:underline hover:cursor-pointer"
                                onClick={() => clearFilters()}
                            >
                                Clear all
                            </span>
                        </div>
                    )
                }
            </div>

            <CheckFilter 
                trueFilter="Internal" 
                falseFilter="External" 
                filter={props.isInternal} 
                onChange={props.setIsInternal}
            />
            <Separator />
            <CheckFilter 
                trueFilter="Online" 
                falseFilter="In-person" 
                filter={props.isOnline}
                onChange={props.setIsOnline}    
            />
            <Separator />
            <TagFilters title="Tags" tags={props.trainings.tag_aggs} onChange={props.addTagFilter} />
            <Separator />
            <TagFilters title="Providers" tags={props.trainings.provider_aggs} onChange={props.setProvider}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return  (
        { 
            trainings: state.trainings,
            isOnline: state.isOnline,
            isInternal: state.isInternal,
            tagFilters: state.tagFilters,
            provider: state.provider
        }
     );
};

const mapDispatchToProps = {
    setIsOnline,
    setIsInternal,
    addTagFilter,
    clearTagFilters,
    setProvider
};


export default connect(mapStateToProps, mapDispatchToProps)(Filters);