function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className='nextstyle'
            // style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        >
            <i class="fas fa-chevron-right"></i>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className='prestyle'
            // style={{
            //     ...style, display: "inline-block", background: "green"
            // }}
            onClick={onClick}
        >
            <i class="fas fa-chevron-left"></i>
        </div>
    );
}
export { SampleNextArrow, SamplePrevArrow }