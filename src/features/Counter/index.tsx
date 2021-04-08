import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { decrease, increase } from "./couterSlice";

const CounterFeature = () => {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    const handleIncreaseClick = () => {
        const action = increase();

        dispatch(action);
    };

    const handleDecreaseClick = () => {
        const action = decrease();

        dispatch(action);
    };

    return (
        <div>
            Counter : {count}
            <div>
                <button onClick={handleIncreaseClick}>Increase</button>
            </div>
            <div>
                <button onClick={handleDecreaseClick}>Decrease</button>
            </div>
        </div>
    );
};

export default CounterFeature;
