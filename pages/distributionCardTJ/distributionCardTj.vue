<template>
	<!-- <div>分销卡统计</div> -->
	<view class="container">
		<!-- 顶部搜索框 -->
		<view class="header">
			<input type="text" placeholder="请输入销售人信息查询" v-model="inputMsg">
			<button type="primary" size="mini" @tap="getMsg">确定</button>
		</view>
		<!-- 3列数据 -->
		<view class="nav">
			<view class="str">
				<text class="msgNmber">{{iSum}}</text><br>
				<text>分销卡总张数</text>
			</view>
			<view class="str">
				<text class="msgNmber">{{useCount}}</text><br>
				<text>已销售张数</text>
			</view>
			<view class="str">
				<text class="msgNmber">{{unuseCount}}</text><br>
				<text>未发行</text>
			</view>
		</view>
		<!-- 分销卡数据 -->
		<view class="distributionCard">
			<uni-collapse >
				<uni-collapse-item ref="add" v-for="(item,index) in cardDetailList" :key="index" :title="'编号'+(item.pkNo)" :state="item.iSuse=='true'?`已发行(${item.salesman})`:'未销售'" :show-animation="true" :open="false">
					<view class="line">
						<text class="lineText">充值卡号</text>
						<text class="lineValue">{{item.cardNo}}</text>
					</view>
					<view class="line">
						<text class="lineText">充值卡金额</text>
						<text class="lineValue">{{item.amt}}元</text>
					</view>
					<view class="line">
						<text class="lineText">充值卡类型</text>
						<text class="lineValue">{{item.Name}}</text>
					</view>
					<view class="line">
						<text class="lineText">电话</text>
						<text class="lineValue" v-show="item.Tel">{{item.Tel}}</text>
						<text class="lineValue" v-show="!item.Tel">暂无</text>
					</view>
					<view class="line">
						<text class="lineText">姓名</text>
						<text class="lineValue" v-show="item.userName">{{item.userName}}</text>
						<text class="lineValue" v-show="!item.userName">暂无</text>
					</view>
					<view class="line">
						<text class="lineText">用户编号</text>
						<text class="lineValue" v-show="item.userNo">{{item.userNo}}</text>
						<text class="lineValue" v-show="!item.userNo">暂无</text>
					</view>
					<view class="line">
						<text class="lineText">销售人</text>
						<text class="lineValue">{{item.salesman}}</text>
					</view>
					<view class="line">
						<text class="lineText">销售时间</text>
						<text class="lineValue">{{item.useDate}}</text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>
<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import * as requests from '../../common/requests.js'
	import variable from '../../common/variable.js'
	export default {

		data() {
			return {
				inputMsg: '',
				ishow: false,
				animationData: {},
				content: '',
				State:'已销售',
				idMoney:'编号(20元)',
				isopen:false,
				iSum:'',
				unuseCount:'',
				useCount:'',
				startDt:'',
				endDt:'',
				shopNo:'',
				cardDetailList:[],
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
					variable.that.client = res.data
				}
			})
		},
		onShow() {
			this.getCardMsg()
		},
		
		mounted() {
		
		},
		methods: {
			// 搜索分销卡详情信息
			getMsg(){
				this.getCardMsg()
			},
			getCardMsg(){
				variable.that = this
				uni.getStorage({
					key: "fkshopNo",
					success: function(res) {
						console.log(res)
						variable.that.fkshopNo = res.data
					}
				})
				let url="/api/Manager.ashx?Function=HttpQueryRefillcardList"
				let obj={
					startDt:variable.that.startDt,
					endDt:variable.that.endDt,
					shopNo:variable.that.fkshopNo,
					salesman:variable.that.inputMsg
				}
				let i=JSON.stringify(obj)
				requests.multiplexFun(variable.that.client, i, url).then(res => {
					console.log(res)
					if (res.data.State == '成功') {
						let cardLlist=res.data.Body.sellCount
						variable.that.iSum=cardLlist.iSum
						variable.that.unuseCount=cardLlist.unuseCount
						variable.that.useCount=cardLlist.useCount
						variable.that.cardDetailList=res.data.Body.cards
					}
				})
			}
		},
	}
</script>
<style scoped>
	.Cbottom {
		font-size: 14px;
		font-weight: bold;
		margin-left: 10px;
	}

	.lineText,
	.lineValue {
		border: 1px solid #ccc;
		line-height: 25px;
	}

	.lineText {
		width: 30%;
		text-align: center;
	}

	.lineValue {
		width: 70%;
		text-align: center;
	}

	.line {
		display: flex;
		justify-content: space-between;
	}


	.sellState {
		font-weight: bold;
	}

	.distributionCardDetail {
		width: 99%;
		margin: 0 auto;
	}

	.Cright {
		font-size: 14px;
		font-weight: bold;
		margin-left: 10px;
	}

	.sqr {
		border-bottom: 1px solid #ccc;
		display: flex;
		justify-content: space-between;
		padding-top: 7px;
		padding-bottom: 7px;
		width: 98%;
		margin: 0 auto;
	}

	.idMoney {
		font-weight: bold;
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

	.nav {
		width: 99%;
		margin: 0 auto;
		padding-top: 3px;
		text-align: center;
		display: flex;
		justify-content: space-between;
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

	.container {
		padding-top: 10px;
		width: 99%;
		margin: 0 auto;
	}
</style>
