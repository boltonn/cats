
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Training from "./Training";
import Filters from "./Filters";
import { fetchTrainings } from "../actions";

// TODO: screen for no results
// TODO: filters should be fixed as you scroll down

const Trainings = (props) => {

    // do a search if any fields change (dont think this is right but it seems to work)
    useEffect(() => {
        // make sure props not undefined
        if (props) {
            props.fetchTrainings(
                props.page, props.searchTerm, props.tagFilters, props.isOnline, props.isInternal, props.provider, props.sortKey
            );
        }
    }, [props.page, props.searchTerm, props.tagFilters, props.isOnline, props.isInternal, props.provider, props.sortKey]);

    if (props.trainings) {
        return (
            <div className="grid grid-cols-5">
                <section className='relative col-span-1 hidden md:inline-flex min-w-[200px]'>
                    <Filters />
                </section>
                {/* show loading screen if still loading */}
                <div className='col-span-4'>
                    {(props.isLoading)
                        ? <span>Loading...</span>
                        : 
                            <div className="inline-flex flex-col">
                                {props.trainings.data.map(training => (
                                    <Training key={training.id} training={training} />
                                ))}
                            </div>
                    }
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return (
        {
            trainings: state.trainings,
            isLoading: state.isLoading,
            page: state.page,
            searchTerm: state.searchTerm,
            tagFilters: state.tagFilters,
            isOnline: state.isOnline,
            isInternal: state.isInternal,
            provider: state.provider,
            sortKey: state.sortKey,
        }
    );
};

const mapDispatchToProps = {
    fetchTrainings
};


export default connect(mapStateToProps, mapDispatchToProps)(Trainings);
