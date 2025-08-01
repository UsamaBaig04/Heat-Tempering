import React,{useState} from 'react'
import * as reportActions from "../redux/action/report"
import { connect } from 'react-redux';

const ExportReport = ({report}) => {
    return (
        <>
            <div>ExportReport</div>
            <div>Parentreport:{report}</div>
        </>
    )
}

const mapStateToProps = (state=>({
    report: state.Report.report,

}))

const withConnect = connect(mapStateToProps)

export default (withConnect)(ExportReport);