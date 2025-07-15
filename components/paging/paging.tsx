import classNames from "classnames";
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";
import "./paging.css"

interface PageButtonProps {
    pageNum: number | string
    activePage: number
    onChange: (page: number) => void
}

function PageButton ({pageNum, activePage, onChange}: PageButtonProps) {

    // Three dots
    if (typeof pageNum !== "number") return (
        <div className="page-number-dots">{pageNum}</div>
    )
    
    return (
        <div className={classNames("page-btn", {"active-page": pageNum === activePage})}>
            <button type="button" onClick={() => onChange(pageNum)}>
                {pageNum}
            </button>
        </div>
    )
}

interface PagingProps {
    page: number
    pageCount: number
    slidingWindowSize?: number
    onChange: (page: number) => void
}

export function Paging ({page, pageCount, slidingWindowSize=6, onChange}: PagingProps) {

    if (pageCount === 0) return null

    const pages = []
    const dots = "..."
    // NOTE, slidingWindowSize must be at least 4 and ideally an even number
    const halfWindow = Math.floor(slidingWindowSize / 2)
    
    let firstInList, lastInList
    if (pageCount < (slidingWindowSize + 2)) {
        // If there's only a few pages to show, we list them all
        firstInList = 1
        lastInList = pageCount
    } else {
        // Create a sliding window centered on the current page
        firstInList = Math.max(1, page - halfWindow)
        lastInList = Math.min(pageCount, firstInList + slidingWindowSize)
        firstInList = Math.max(1, lastInList - slidingWindowSize)
        
        // There's no space saved if we go "1 ... 3 4" instead of "1 2 3 4"
        if (firstInList === 2) firstInList = 1
        if (lastInList === (pageCount - 1)) lastInList = pageCount
    }
    // Fill the main array with numbers
    for (let i = firstInList; i <= lastInList; ++i) pages.push(i)
    
    // If there is a gap at the start, or end, add some dots
    if (firstInList !== 1) {
        pages.unshift(1)
        pages[1] = dots
    }
    if (lastInList !== pageCount) {
        pages.push(pageCount)
        pages[pages.length - 2] = dots
    }

    return (
        <div className="paging-cont">
            <button className="page-next-previous" disabled={page ===1 } onClick={() => onChange(page-1)}>
                <MdOutlineArrowBackIosNew/>
                Prev
            </button>
            {pages.map((pageNum, idx) => {
                return <PageButton key={idx} pageNum={pageNum} activePage={page} onChange={onChange}/>
            })}
            <button className="page-next-previous" disabled={page === pageCount} onClick={() => onChange(page+1)}>
                Next
                <MdOutlineArrowForwardIos/>
            </button>
        </div>
    )
}