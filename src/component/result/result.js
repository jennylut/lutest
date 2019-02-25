import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react'
import '../../App.css';
import '../../result.css'
class Result extends Component {
    constructor(props){
        super(props)
        this.state={
            time:[],
            baseValList:[],
            userValList:[],
            score:'',
            suffix:'th',
            birdkind:'Saving Bird',
            riskLevel:'high'
        }
    }

    componentDidMount() {
        document.title='Crazy Rich Birds'
        this.fetchData()
        console.log(window.screen.width)
    }

    next(){
        this.props.history.push(`/email`)
    }
    fetchData(){
        let uid = localStorage.getItem("uid")
        let riskScore = localStorage.getItem("riskScore")
        if(riskScore==0||riskScore==1){
            riskScore=1
        }else if(riskScore==3||riskScore==4){
            riskScore=3
        }else{
            riskScore=2
        }
        let stock1 = localStorage.getItem("stock1")
        let stock2 = localStorage.getItem("stock2")
        let bond = localStorage.getItem("bond")
        let gold = localStorage.getItem("gold")
        console.log(riskScore)
        if(riskScore==0||riskScore==1){
            this.setState({
                riskLevel:'low'
            })
        }else if(riskScore==2){
            this.setState({
                riskLevel:'medium'
            })
        }
        let body = {
            "uid":uid,
            "riskLevel":riskScore,
            "stock1":stock1,
            "stock2":stock2,
            "bond":bond,
            "other":gold,
            "lang":null,
            "orgId":"310003",
            "reqChl":"03",
            "reqTime":"20180524150130123",
            "serNum":"1234567890",
            "sign":"SHA256withRSA2048",
            "token":"D688D2555ED94C7285D26BDF4B13D08F",
            "tranCode":"LU002",
            "version":"100"
        }
        fetch("https://paladin.pingan.com.cn/app/LU002",{
            method:'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result)=>{
            return result.json()
        }).then((res)=>{
            console.log(res)
            // localStorage.setItem('email',res.email)
            let time = []
            let base = []
            let user = []
            res.baseValList.map((value,key)=>{
                time.push(value.retDate)
                base.push((value.retValue*100).toFixed(2))
            })
            res.userValList.map((value,key)=>{
                user.push((value.retValue*100).toFixed(2))
            })
            let score = parseInt(res.rankPercent)
            this.setState({
                time:time,
                baseValList:base,
                userValList:user,
                score:score,
            })
            if(score===1||score===21||score===31||score===41||score===51||score===61||score===71||score===81||score===91){
                this.setState({
                    suffix:"st"
                })
            }else if(score===2||score===22||score===32||score===42||score===52||score===62||score===72||score===82||score===92){
                this.setState({
                    suffix:"nd"
                })
            }else if(score===3||score===23||score===33||score===43||score===53||score===63||score===73||score===83||score===93){
                this.setState({
                    suffix:"rd"
                })
            }
            if(score==0||(score>0&&score<30)){
                this.setState({
                    birdkind:"Saving Bird"
                })
            }else if(score==30||(score>30&&score<49)){
                this.setState({
                    birdkind:"Golden Bird"
                })
            }else if(score==50||(score>50&&score<69)){
                this.setState({
                    birdkind:"Diamond Bird"
                })
            }else if(score==70||(score>70&&score<89)){
                this.setState({
                    birdkind:"Crown Bird"
                })
            }else if(score==90||(score>90&&score<100)){
                this.setState({
                    birdkind:"Bird of Trump"
                })
            }
        }).catch(err=>
            console.log(err)
        )
    }
    getLineChart(){
        if(window.screen.width<621){
            console.log('iphone')
            let option={
                backgroundColor: "#fff",
                tooltip: {
                    trigger: 'axis',
                    formatter: "{a0}: {c0}%"+"<br/>"+"{a1}: {c1}%"
                },
                grid: {
                    top:'15%',
                    left: '2%',
                    right: '5%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.state.time,
                    show: false,
                    splitLine: {
                        show: false
                    },
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        textStyle:{
                            color:'#6B7D97',
                            fontSize:'10'
                        },
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: function(a){
                            return a + "%"
                        },
                        textStyle:{
                            fontFamily: "STYuanti-SC-Regular",
                            color:'#666666',
                            fontSize:'10'
                        },
                    },

                    splitLine: {
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'#979797',
                            width:1,
                            type:'dashed'
                        }
                    },
                    splitArea:{
                        show:true,
                        areaStyle:{
                            color:'#F6F8FB',
                            opacity: 0
                        }
                    }
                },
                series: [
                    {
                        name:'Robo Advisor',
                        type:'line',
                        data:this.state.baseValList,
                        symbol:'none',
                        itemStyle: {
                            // width:10,
                            normal: {
                                lineStyle:{
                                    width:2,
                                    color:'#FF8C1A'
                                }
                            },

                        },
                    },
                    {
                        name:'Your Investment',
                        type:'line',
                        data:this.state.userValList,
                        symbol:'none',
                        itemStyle: {
                            normal: {
                                // width:100,
                                color: '#1D99FF',
                                lineStyle:{
                                    width:1,
                                }
                            }
                        },
                    },

                ]
            };
            return option
        }else{
            console.log('ipad')
            let option={
                backgroundColor: "#fff",
                tooltip: {
                    trigger: 'axis',
                    formatter: "{a0}: {c0}%"+"<br/>"+"{a1}: {c1}%"
                },
                grid: {
                    top:'15%',
                    left: '2%',
                    right: '5%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.state.time,
                    show: false,
                    splitLine: {
                        show: false
                    },
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        textStyle:{
                            color:'#6B7D97',
                            fontSize:'10'
                        },
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: function(a){
                            return a + "%"
                        },
                        textStyle:{
                            fontFamily: "STYuanti-SC-Regular",
                            color:'#666666',
                            fontSize:'15'
                        },
                    },

                    splitLine: {
                        show: false
                    },
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'#979797',
                            width:1,
                            type:'dashed'
                        }
                    },
                    splitArea:{
                        show:true,
                        areaStyle:{
                            color:'#F6F8FB',
                            opacity: 0
                        }
                    }
                },
                series: [
                    {
                        name:'Robo Advisor',
                        type:'line',
                        data:this.state.baseValList,
                        symbol:'none',
                        itemStyle: {
                            normal: {
                                color: '#FF8C1A',
                                lineStyle:{
                                    width:4,
                                }
                            },

                        },
                    },
                    {
                        name:'Your Investment',
                        type:'line',
                        data:this.state.userValList,
                        symbol:'none',
                        itemStyle: {
                            normal: {
                                // width:100,
                                color: '#1D99FF',
                                lineStyle:{
                                    width:2,
                                }
                            }
                        },
                    },

                ]
            };
            return option
        }

    }

    render() {
        return (
            <div className="result commonBg">
                <div className="quTop1">
                    <span className="topTitle">Egg Allocation Result</span>
                </div>
                {/*<div className='crownbird'></div>*/}
                <div className={this.state.birdkind=='Saving Bird'?"savingbird":this.state.birdkind=="Golden Bird"?"goldenbird":this.state.birdkind=="Diamond Bird"?"diamondbird":this.state.birdkind=="Crown Bird"?"crownbird":"trump"}></div>
                <div className='resultContent'>
                    {
                        (this.state.score>50 || this.state.score==50)&&
                        <div className='resultText'>
                            <p className='resultCon2'>
                                Congratulations!
                            </p>

                            <p className='resultCon2'>
                                Your investment return is in the <span className='percentile'>{this.state.score}{this.state.suffix}</span> percentile
                            </p>
                            <p className='resultCon2'>
                                amongst the bird investors of {this.state.riskLevel} risk appetite.
                            </p>

                            {/*<div className='resultCon2 margintop20'>*/}
                                {/*You are {this.state.birdkind}*/}
                            {/*</div>*/}
                        </div>
                    }
                    {
                        this.state.score<50&&
                        <div className='resultText'>
                            <div className='resultCon2 margintop20'>
                                Your investment return is in the <span className='percentile'>{this.state.score}{this.state.suffix}</span> percentile
                            </div>
                            <div className='resultCon2'>
                                amongst the bird investors of {this.state.riskLevel} risk appetite.
                            </div>
                            {/*<div className='resultCon2 margintop20'>*/}
                                {/*You are {this.state.birdkind}*/}
                            {/*</div>*/}
                        </div>
                    }
                    <div className='tubiao'>
                        <div className='orangeLine'>
                        </div>
                        <div>
                            Robo Advisor
                        </div>
                        <div className='blueLine'>
                        </div>
                        <div>
                            Your Investment
                        </div>
                    </div>
                    {
                        window.screen.width<621&&
                        <ReactEcharts
                            style={{"height":"3.9473684210526314rem"}}
                            option={this.getLineChart()}
                        />
                    }
                    {
                        (window.screen.width>621||window.screen.width==621)&&
                        <ReactEcharts
                        style={{"height":"3.9473684210526314rem"}}
                        option={this.getLineChart()}
                        />
                    }
                    <div className='learnMore' onClick={()=>this.next()}>
                    </div>

                </div>
            </div>
        );
    }
}

export default Result;
