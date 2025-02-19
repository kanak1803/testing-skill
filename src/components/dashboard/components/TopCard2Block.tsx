    const TopCard2Block = () => {
        const cardContent = [
        {
            id: 1,
            icon: "flaticon-briefcase",
            countNumber: "22",
            metaName: "Total Application",
            uiClass: "ui-blue",
        },
        {
            id: 2,
            icon: "la-file-invoice",
            countNumber: "9382",
            metaName: "Hired",
            uiClass: "ui-green",
        },
        {
            id: 3,
            icon: "la-comment-o",
            countNumber: "74",
            metaName: "Rejected",
            uiClass: "ui-red",
        },
        {
            id: 4,
            icon: "la-bookmark-o",
            countNumber: "32",
            metaName: "Shortlisted",
            uiClass: "ui-yellow",
        },
        ];
    
        return (
        <>
            {cardContent.map((item) => (
            <div
                className=" ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
                key={item.id}
            >
                <div className={`  ui-item ${item.uiClass}`}>
                {/* <div className="left">
                    <i className={`icon la ${item.icon}`}></i>
                </div> */}
                <div className="center">
                    <h4>{item.countNumber}</h4>
                    <p >{item.metaName}</p>
                </div>
                </div>
            </div>
            ))}
        </>
        );
    };
    
    export default TopCard2Block;
    