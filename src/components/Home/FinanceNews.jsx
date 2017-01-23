
import React, { Component, PropTypes } from 'react';
import FinanceItem from './FinanceItem';
/** 金融资讯 */
export default class FinanceNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socialType: 'financenews',
      news: this.props.financeNewsList, // default value
    };
  }

  static propTypes = {
    financeNewsList: PropTypes.object.isRequired,
    dakaList: PropTypes.object.isRequired,
    reviewAnalyzesList: PropTypes.object.isRequired,
    brokerDynamicList: PropTypes.object.isRequired,
  }

    /* switch page*/
  handleShow(type) {
    switch (type) {
      case 1:
        this.setState({
          news: this.props.financeNewsList,
          socialType: 'financenews',
        });
        break;
      case 2:
        this.setState({
          news: this.props.dakaList,
          socialType: 'daka',
        });
        break;
      case 3:
        this.setState({
          news: this.props.reviewAnalyzesList,
          socialType: 'reviewanalyzes',
        });
        break;
      case 4:
        this.setState({
          news: this.props.brokerDynamicList,
          socialType: 'brokerdynamic',
        });
        break;
    }
  }

  render() {
    return (
      <div className="financial_headlines tabWrap right">
        <div className="ht_title tabBtnBox">
          <div className="ht_title_hv">
            <span className="mintitle tabBtn on" onClick={this.handleShow.bind(this, 1)} >财经要闻</span>
            <span className="mintitle tabBtn" onClick={this.handleShow.bind(this, 2)} >大咖秀</span>
            <span className="mintitle tabBtn" onClick={this.handleShow.bind(this, 3)} >评论分析</span>
            <span className="mintitle tabBtn" onClick={this.handleShow.bind(this, 4)} >经纪商动态</span>
          </div>
          <a id="aMore" href={`/social/${this.state.socialType}`} target="_blank">更多<i>>></i></a>
        </div>
        <div className="tabContBox">
          <div className="fh_box tabCont on">
            <FinanceItem news={this.state.news} />
          </div>
        </div>
      </div>
    );
  }
}

