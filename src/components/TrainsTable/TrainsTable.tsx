import React, {useEffect, useState} from 'react';
import './TrainsTable.css';
import TrainInfo from "./TrainInfo";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTrains, selectTrains, selectTrainsFetchStatus} from "./tableSlice";

export interface Train {
    name: string;
    description: string;
    characteristics: TrainCharacteristics[];
}

export interface TrainCharacteristics {
    engineAmperage: number;
    force: number;
    speed: number;
}


const TrainsTable = () => {
    const [selectedTrainIndex, setSelectedTrainIndex] = useState<number>(-1);

    const dispatch = useAppDispatch();

    const status = useAppSelector(selectTrainsFetchStatus);
    const trains = useAppSelector(selectTrains);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTrains());
        }
    }, [status, dispatch]);

    const renderTrain = (train: Train, index: number) => {
        return (
            <tr key={train.name} className={"TableRow"}
                onClick={() => setSelectedTrainIndex(index)}
            >
                <td className={"TableData"}>{train.name}</td>
                <td className={"TableData"}>{train.description}</td>
            </tr>
        );
    }

    return (
        <div className={"TrainsTableWrapper"}>
            <div className={"TrainsTableContainer"}>
                <div className={"TrainsTableHeader"}>Поезда</div>
                <table className={"TrainsLeftTable"}>
                    <tbody>
                    <tr className={"TableHead"}>
                        <th className={"TableHeader"}>Название</th>
                        <th className={"TableHeader"}>Описание</th>
                    </tr>
                    {trains.map(renderTrain)}
                    </tbody>
                </table>
            </div>
            {selectedTrainIndex >= 0 &&
                <TrainInfo train={trains[selectedTrainIndex]} index={selectedTrainIndex}></TrainInfo>}
        </div>
    );
}

export default TrainsTable;
