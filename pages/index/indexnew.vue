<template>
	<view>
		<an-layer ref="anRef" autoClose timer="2">
		</an-layer>
		<view class="top_nav">
			<div @tap="staffPickUp">
				<image src="../../static/imgs/u347.png" mode=""></image>
				<text class="nav_text">员工取件</text>
			</div>
			<div @tap="staffSave">
				<image src="../../static/imgs/u327.png" mode=""></image>
				<text class="nav_text">员工存件</text>
			</div>
			<div @tap="shopperPickUp">
				<image src="../../static/imgs/u332.png" mode=""></image>
				<text class="nav_text">顾客取件</text>
			</div>
			<div class="movr"><text class="nav_text_movr" @tap="stillMore">更多</text></div>
		</view>
		<!-- tabs -->
		<view style="width:100%;">
			<view style="margin-top: 20upx;width: 100%;">
				<zzx-tabs :items="items" :current="current" @clickItem="onClickItem" ref="mytabs" style="font-size:16px;">
				</zzx-tabs>
			</view>
			<view style="margin-top: 20upx;color:#999999;font-size: 24upx;height: 260upx;">
				<uni-segmented-control :current="dateCurrent" :values="dates" @clickItem="getAllOrderCount" style-type="button"
				 active-color="blue"></uni-segmented-control>
				<!-- 订单统计 -->
				<view v-show="current === 0">
					<view class="first">
						<view class="orderTJ">订单统计</view>
						<view class="content">
							<text class="sqr">
								<span class="fw">{{totalReserveCount}}</span><br>
								<span class="conText">总订单</span>
							</text>
							<text class="sqr">
								<span class="fw">{{FinishReserveCount}}</span><br>
								<span class="conText">完成订单</span>
							</text>
							<text class="sqr">
								<span class="fw">{{UnfinishReserveCount}}</span><br>
								<span class="conText">未完成订单</span>
							</text>
						</view>
						<view class="content">
							<text class="sqr">
								<span class="fw">{{CancelReserveCount}}</span><br>
								<span class="conText">已取消订单</span>
							</text>
						</view>
					</view>
				</view>
				<!-- 物件统计 -->
				<view v-show="current === 0">
					<view class="first">
						<view class="orderTJ">物件统计</view>
						<view class="content">
							<text class="sqr">
								<span class="fw">{{totalClothsCount}}</span><br>
								<span class="conText">衣物总件数</span>
							</text>
							<text class="sqr">
								<span class="fw">{{FinishClothsCount}}</span><br>
								<span class="conText">完成件数</span>
							</text>
							<text class="sqr">
								<span class="fw">{{UnfinishClothsCount}}</span><br>
								<span class="conText">未完成件数</span>
							</text>
						</view>
						<view class="content">
							<text class="sqr">
								<span class="fw">{{CancelClothsCount}}</span><br>
								<span class="conText">已取消件数</span>
							</text>
						</view>
					</view>
				</view>
				<!-- 金额统计 -->
				<view v-show="current === 0">
					<view class="first">
						<view class="orderTJ">金额统计</view>
						<view class="content">
							<text class="sqr">
								<span class="fw">{{totalPayMoney}}</span><br>
								<span class="conText">订单总额</span>
							</text>
							<text class="sqr">
								<span class="fw">{{FinishPayMoney}}</span><br>
								<span class="conText">完成单金额</span>
							</text>
							<text class="sqr">
								<span class="fw">{{UnfinishPayMoney}}</span><br>
								<span class="conText">未完成单金额</span>
							</text>
						</view>
						<view class="content">
							<text class="sqr">
								<span class="fw">{{CancelPayMoney}}</span><br>
								<span class="conText">取消单金额</span>
							</text>
						</view>
					</view>
				</view>
				<!-- 已完成订单提成 -->
				<view v-show="current === 0">
					<view class="first">
						<view class="orderTJ">已完成订单提成</view>
						<view class="content">
							<text class="sqr">
								<span class="fw">3</span><br>
								<span class="conText">订单提成</span>
							</text>
						</view>
					</view>
				</view>
				<!-- 分销统计 -->
				<view v-show="current === 1">
					<view class="first">
						<view class="seeDetail">
							<view class="orderTJ">分销卡数量统计</view>
							<text class="detail" @tap="cardDetail">查看详情</text>
						</view>
						<view class="content">
							<text class="sqr">
								<span class="fw">{{iSum}}</span><br>
								<span class="conText">分销卡总数</span>
							</text>
							<text class="sqr">
								<span class="fw">{{useCount}}</span><br>
								<span class="conText">已销张数</span>
							</text>
							<text class="sqr">
								<span class="fw">{{unuseCount}}</span><br>
								<span class="conText">未销张数</span>
							</text>
						</view>

					</view>
					<!-- 已销卡消费金额统计 -->
					<view class="first">
						<view class="seeDetail">
							<view class="orderTJ">已销卡消费金额统计</view>
							<text class="detail" @tap="orderDetail">查看详情</text>
						</view>
						<view class="content">
							<text class="sqr">
								<span class="fw">{{payMoneyTotal}}</span><br>
								<span class="conText">消费金额</span>
							</text>
							<text class="sqr">
								<span class="fw">{{clothsCount}}</span><br>
								<span class="conText">消费笔数</span>
							</text>
							<text class="sqr">
								<span class="fw">{{washCount}}</span><br>
								<span class="conText">衣物数量</span>
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import * as requests from '../../common/requests.js'
	import variable from '../../common/variable.js'
	import zzxTabs from "@/components/zzx-tabs.vue"
	export default {
		components: {
			zzxTabs
		},
		data() {
			return {
				banners: [],
				dates: ["今日", "一周内", "一月内", "一年内"],
				current: 0,
				dateCurrent: 0,
				items: ['订单统计', '分销统计', ],
				startDt: '', //开始时间
				endDt: '', //结束时间
				dateScope_op: ["day", "week", "month", "year"],
				UnfinishReserveCount: '', //未完成订单数
				UnfinishClothsCount: '', //未完成物件数
				UnfinishPayMoney: '', //未完成支付金额
				FinishReserveCount: '', //完成订单数
				FinishClothsCount: '', //完成物件数
				FinishPayMoney: '', //完成支付金额
				CancelReserveCount: '', //取消订单数
				CancelClothsCount: '', //取消物件数
				CancelPayMoney: '', //取消额
				unuseCount: '', //未销售数
				useCount: '', //已销售数
				iSum: '', //总数
				totalReserveCount:'',//总订单数
				totalClothsCount:'',//总物件数
				totalPayMoney:'',//总金额
				clothsCount:'',
				payMoneyTotal:'',
				washCount:''
			}
		},
		mounted() {

		},
		onLoad() {
			//#ifdef H5
			requests.Prompt()
			//#endif
			variable.that = this
			this.shop = variable.shop //  登录之后返回的数据
			uni.getStorage({
				key: "ClientAddr",
				success: function(res) {
					variable.that.client = res.data
				}
			})
			if (variable.that.client == "") {
				variable.that.$refs.anRef.show("登录失效，请重新登录", {
					type: "error"
				});
				setTimeout(requests.toLogin, 1500)
			}
		},
		onShow() {
			this.getTodayData()
		},
		onReady() {
			// #ifdef H5
			if (uni.getSystemInfoSync().platform == "ios") {
				let url = location.href.split("#")[0]
				let inc = {
					PageUrl: url
				}
				let i = JSON.stringify(inc)
				requests.getConfig(variable.that.client, i)
			}
			// #endif
			requests.getStartDate(this.scope).then(data => {
				variable.that.startdate = data
			})
			this.orderGain = variable.orderGain
		},
		methods: {
			// 选择时间区域，  今日   一周内 一月内  一年内
			getAllOrderCount(index) {
				variable.that = this;
				console.log(index)
				if (this.dateCurrent !== index) {
					this.dateCurrent = index;
				}
				let startdate
				requests.getStartDate(this.dateScope_op[index]).then(data => {
					startdate = data
				})
				let date = new Date
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				let nowdata = year + "-" + month + "-" + day //当前日期
				let nowtime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
				
				setTimeout(()=>{
					variable.that.startDt= startdate + " " + "00:00:00"
					variable.that.endDt=nowdata + " " + nowtime
					let obj = {
						startDt: startdate + " " + "00:00:00",
						endDt: nowdata + " " + nowtime
					}
					let i = JSON.stringify(obj)
					let url = "/api/Applet.ashx?Function=HttpAggregateMerchantData"
					requests.multiplexFun(variable.that.client, i, url).then(res => {
						console.log(res)
						if (res.data.State == '成功') {
							let order=res.data.Body.order
							variable.that.FinishReserveCount=order.FinishReserveCount
							variable.that.UnfinishReserveCount=order.UnfinishReserveCount
							variable.that.CancelReserveCount=order.CancelReserveCount
							variable.that.totalReserveCount=order.CancelReserveCount+order.UnfinishReserveCount+order.FinishReserveCount
							variable.that.FinishClothsCount=order.FinishClothsCount
							variable.that.UnfinishClothsCount=order.UnfinishClothsCount
							variable.that.CancelClothsCount=order.CancelClothsCount
							variable.that.totalClothsCount=order.CancelClothsCount+order.UnfinishClothsCount+order.FinishClothsCount
							variable.that.FinishPayMoney=order.FinishPayMoney
							variable.that.UnfinishPayMoney=order.UnfinishPayMoney
							variable.that.CancelPayMoney=order.CancelPayMoney
							variable.that.totalPayMoney=order.CancelPayMoney+order.UnfinishPayMoney+order.FinishPayMoney
							let refillCard=res.data.Body.refillCard
							variable.that.iSum=refillCard.iSum
							variable.that.unuseCount=refillCard.unuseCount
							variable.that.useCount=refillCard.useCount
							let refillCardSum=res.data.Body.refillCardSum
							variable.that.payMoneyTotal=refillCardSum.payMoneyTotal
							variable.that.clothsCount=refillCardSum.clothsCount
							variable.that.washCount=refillCardSum.washCount
						}
					})
				}
				,0)
			},
			orderDetail() {
				variable.that=this
				uni.navigateTo({
					url: '../distributionOrderTj/distributionOrderTj?startDt='+variable.that.startDt+'&endDt='+variable.that.endDt,
					
				})
			},
			cardDetail() {
				variable.that=this
				uni.navigateTo({
					url: '../distributionCardTJ/distributionCardTj?startDt='+variable.that.startDt+'&endDt='+variable.that.endDt
				})
			},
			// 获取当天的主页面各数据
			getTodayData(){
				variable.that = this;
				variable.that.dateCurrent=0
				let startdate
				requests.getStartDate(variable.that.dateScope_op[0]).then(data => {
					startdate = data 
				})
				let date = new Date
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				let nowdata = year + "-" + month + "-" + day //当前日期
				let nowtime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
				
				setTimeout(()=>{
					variable.that.startDt= startdate + " " + "00:00:00"
					variable.that.endDt=nowdata + " " + nowtime
					let obj = {
						startDt: startdate + " " + "00:00:00",
						endDt: nowdata + " " + nowtime
					}
					let i = JSON.stringify(obj)
					let url = "/api/Applet.ashx?Function=HttpAggregateMerchantData"
					requests.multiplexFun(variable.that.client, i, url).then(res => {
						console.log(res)
						if (res.data.State == '成功') {
							let order=res.data.Body.order
							variable.that.FinishReserveCount=order.FinishReserveCount
							variable.that.UnfinishReserveCount=order.UnfinishReserveCount
							variable.that.CancelReserveCount=order.CancelReserveCount
							variable.that.totalReserveCount=order.CancelReserveCount+order.UnfinishReserveCount+order.FinishReserveCount
							variable.that.FinishClothsCount=order.FinishClothsCount
							variable.that.UnfinishClothsCount=order.UnfinishClothsCount
							variable.that.CancelClothsCount=order.CancelClothsCount
							variable.that.totalClothsCount=order.CancelClothsCount+order.UnfinishClothsCount+order.FinishClothsCount
							variable.that.FinishPayMoney=order.FinishPayMoney
							variable.that.UnfinishPayMoney=order.UnfinishPayMoney
							variable.that.CancelPayMoney=order.CancelPayMoney
							variable.that.totalPayMoney=order.CancelPayMoney+order.UnfinishPayMoney+order.FinishPayMoney
							let refillCard=res.data.Body.refillCard
							variable.that.iSum=refillCard.iSum
							variable.that.unuseCount=refillCard.unuseCount
							variable.that.useCount=refillCard.useCount
							let refillCardSum=res.data.Body.refillCardSum
							variable.that.payMoneyTotal=refillCardSum.payMoneyTotal
							variable.that.clothsCount=refillCardSum.clothsCount
							variable.that.washCount=refillCardSum.washCount
						}
					})
				}
				,0)
			},
			// 订单统计  分销统计
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}

			},
			staffPickUp() {
				uni.navigateTo({
					url: "../employeePick-up/employeePick-up"
				})
			},
			staffSave() {
				uni.navigateTo({
					url: "../employeeStock/employeeStock"
				})
			},
			shopperPickUp() {
				uni.navigateTo({
					url: "../customerPick-up/customerPick-up"
				})
			},
			stillMore() {
				this.$refs.anRef.show("敬请期待", {
					type: "warn"
				});
			}
		},
	}
</script>
<style scoped>
	.fw {
		font-weight: bold;
		display: block;
		text-align: center;
		margin-top: 20px;
	}

	.seeDetail {
		display: flex;
		justify-content: space-between;
		border: 1px solid #ccc;

	}

	.detail {
		width: 23%;
		border: 1px solid #ccc;
		text-align: center;
		background-color: #0FAEFF;
		color: #fff;
		outline: none;
		border-radius: 5px;
	}

	.conText {
		display: block;
		text-align: center;
	}

	.sqr {
		border: 1px solid #ccc;
		height: 100px;
		width: 33%;
		line-height: 20px;
	}

	.content {
		display: flex;
		justify-content: space-between;
	}

	.first {
		padding-left: 1px;
	}

	.orderTJ {
		width: 100%;
		border: 1px solid #ccc;
		border-left: 3px solid #0099FF;
		padding-left: 10px;
	}

	.top_nav {
		display: flex;
		flex-flow: row nowrap;
	}

	.nav_text,
	.nav_text_movr {
		font-size: 14px;
		font-weight: 600;
		color: rgb(97, 97, 97);
	}

	.top_nav div {
		width: 187.5upx;
		border: 1px solid rgb(231, 231, 230);
		border-bottom: 8px solid rgb(231, 231, 230);
		text-align: center;
		background-color: #FFFFFF;
	}

	.top_nav div image {
		width: 100upx;
		height: 100upx;
		display: block;
		margin: 12upx auto;
	}

	.movr {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
