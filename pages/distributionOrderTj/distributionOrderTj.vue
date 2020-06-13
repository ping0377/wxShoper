<template>
	<view class="container">
		<!-- 顶部搜索框 -->
		<view class="header">
			<input type="text" placeholder="请输入销售人信息查询" v-model="inputMsg">
			<button type="primary" size="mini" @click="getMmsg">确定</button>
		</view>
		<view class="promptMsg">
			<text class="prompt">说明：本页统计信息按照已完成真实订单计算。</text>
		</view>
		<!-- 3列数据 -->
		<view class="nav">
			<view class="str">
				<text class="msgNmber">{{payMoneySum}}</text><br>
				<text>消费总金额</text>
			</view>
			<view class="str">
				<text class="msgNmber">{{washCount}}</text><br>
				<text>消费笔数</text>
			</view>
			<view class="str">
				<text class="msgNmber">{{countSum}}</text><br>
				<text>总件数</text>
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="orderDetailList" v-for="(item,index) in msgList" :key="index">
			<view class="detailList">
				<text class="iconfont icon-yiwancheng detailOkicon"></text>
				<view class="cardOrder">
					<text >{{item.cardNo}}</text><br>
					<text>{{item.salesman}}</text>
				</view>
			</view>
			<view class="orderRight">
				<text class="orderMoney">{{item.payMoneySum}}元</text><br>
				<text>{{item.washCount}}单{{item.countSum}}件</text>
			</view>
		</view>
	</view>

</template>
<script>
	import * as requests from '../../common/requests.js'
	import variable from '../../common/variable.js'
	
	export default {
		data() {
			return {
				inputMsg: '',//销售人
				orderListL:[],
				startDt:'',
				endDt:'',
				msgList:[],
				payMoneySum:0,
				washCount:0,
				countSum:0,
				fkshopNo:''
			}
		},
		onLoad(val) {
			variable.that = this
			this.shop = variable.shop
			variable.that.startDt=val.startDt
			variable.that.endDt=val.endDt
			uni.getStorage({
				key: "ClientAddr",
				success: function(res) {
					console.log(res)
					variable.that.client = res.data
				}
			})
		},
		onShow() {
			this.getOrderMsg()
		},
		mounted() {

		},	
		methods: {
			getMmsg(){
				this.getOrderMsg()
			},
			getOrderMsg() {
				variable.that = this
				uni.getStorage({
					key: "fkshopNo",
					success: function(res) {
						console.log(res)
						variable.that.fkshopNo = res.data
					}
				})
				let url="/api/Manager.ashx?Function=HttpStatRiCardOrder"
				let obj={
					startDt:variable.that.startDt,
					endDt:variable.that.endDt,
					shopNo:variable.that.fkshopNo,
					salesman:variable.that.inputMsg
				}
				console.log(obj)
				let i=JSON.stringify(obj)
				console.log(i)
				requests.multiplexFun(variable.that.client, i, url).then(res => {
					console.log(res)
					if (res.data.State == '成功') {
						variable.that.msgList=res.data.Body
						let i=res.data.Body
						i.map(item=>{
							variable.that.payMoneySum+=item.payMoneySum
							variable.that.countSum+=item.countSum
							variable.that.washCount+=item.washCount
						})
					}
				})
			}
		},
	}
</script>
<style scoped>
	.detailOkicon{
		font-size: 30px;
		color: #008000;
	}
	.cardOrder{
		padding-left: 8px;
	}
	.orderRight{
		padding-right: 8px;
	}
	.orderMoney{
		width: 100%;
		display: inline-block;
		font-weight: bold;
		text-align: right;
	}
	.orderDetailList{
		width: 99%;
		margin:0 auto;
		padding-top: 3px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
	}
	.detailList{
		padding-left: 5px;
		display: flex;
		justify-content: space-between;
	}
	.nav {
		width: 99%;
		margin: 0 auto;
		padding-top: 3px;
		text-align: center;
		display: flex;
		justify-content: space-between;
	}
	.str {
		width: 100%;
		border: 1px solid #ccc;
	}
	.msgNmber {
		line-height: 40px;
		font-weight: bold;
		text-align: center;
	}
	.dateSelect {
		margin-top: 10px;
	}
	.promptMsg {
		width: 99%;
		margin-top: 10px;
		background-color: #FFDEDE;
		border-radius: 10px;
		text-align: center;
	}

	.prompt {
		display: block;
		line-height: 40px;
	}

	.container {
		padding-top: 10px;
		width: 99%;
		margin: 0 auto;
	}

	.header {
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: flex-start;
	}

	.header input {
		width: 70%;
		height: 30px;
		border: 1px solid #333333;
		border-radius: 10px;
		padding-left: 10px;
	}

	.header button {
		width: 20%;
		border-radius: 10px;
	}
</style>
