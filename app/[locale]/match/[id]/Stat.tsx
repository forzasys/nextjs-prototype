import './matchStats.css'

interface StatProps {
    title: string
    homeStat: number
    awayStat: number
    side: string
}

type StatPercentageStyle = {
    width: string
    backgroundColor?: string
}

function Stat ({title, homeStat, awayStat, side}: StatProps) {

    let homeStatPercentage = (homeStat / (homeStat + awayStat)) * 100
    let awayStatPercentage = (awayStat / (homeStat + awayStat)) * 100

    if (homeStat === 0 && awayStat === 0) {
        homeStatPercentage = 50
        awayStatPercentage = 50
    }

    const homeStatPercentageStyle: StatPercentageStyle = {
        width: `${homeStatPercentage}%`
    }
    
    const awayStatPercentageStyle: StatPercentageStyle = {
        width: `${awayStatPercentage}%`
    }

    if (side === "home") {
        homeStatPercentageStyle.backgroundColor = 'var(--primary-color)'
    }

    if (side === "away") {
        awayStatPercentageStyle.backgroundColor = 'var(--primary-color)'
    }

    return (
        <div className="statistic-single">
            <div className="statistic-value">{homeStat}</div>
            <div className="statistic-title">{title}</div>
            <div className="statistic-value">{awayStat}</div>
            <div className="statistic-percentage">
                <div style={homeStatPercentageStyle} className="statistic-percentage-bar" data-aos="fade-right"></div>
                <div style={awayStatPercentageStyle} className="statistic-percentage-bar" data-aos="fade-left"></div>
            </div>
        </div>
    )
}

export default Stat