function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className} //'nextstyle slick-disabled'
            // style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        >
            <i className="fas fa-chevron-right"></i>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            // className='prestyle slick-disabled'
            // style={{
            //     ...style, display: "inline-block", background: "green"
            // }}
            onClick={onClick}
        >
            <i className="fas fa-chevron-left"></i>
        </div>
    );
}
export { SampleNextArrow, SamplePrevArrow }