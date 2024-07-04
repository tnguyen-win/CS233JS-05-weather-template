import Sample from './Sample'

export default function Forecast(props) {
    let current = props.current;
    let samples = props.future;
    // let summaries = props.summaries;
    let jsxArray = samples.map((sample) => <Sample temp={sample.getTemp()} time={sample.getTime()} iconUrl={sample.getIconUrl()} />);

    return (
        <div id='upcoming-forecast'>
            {/* Big */}
            <h2>{current.city}</h2>
            <img src={current.icon} />
            <div class='big-current-temp'>{current.temp}</div>
            <div class='city-name'>{current.name}</div>
            {/* Smaller */}
            <div class='upcoming-weather'>{jsxArray}</div>
        </div>
    );
};
