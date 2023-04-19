<template>
    <div class="flex justify-center max-w-screen-2xl min-w-full min-h-screen bg-white ">
        <!-- select account model -->    
        <div v-if="state.dialogIndex == SELECT_ACCOUNT_MODEL" class="w-96 pt-40">
            <h3 class="font-bold text-lg text-center">{{ $t('wallet') }}</h3>
            <div class="pt-2 py-1 text-center text-sm	"> {{ $t('account.account_tip_1') }}</div>
            <div class="py-1 text-center text-sm	"> {{ $t('account.account_tip_2') }}</div>
            <button @click="setIndex(CREATE_ACCOUNT);createMnemonic();" class="btn btn-outline mt-10 capitalize width-90">{{ $t('account.create_new_account') }}</button>
            <button @click="setIndex(IMPORT_ACCOUNT);cleanMnemonicExist()" class="btn btn-outline mt-5 capitalize width-90">{{ $t('account.import_existing_account') }}</button>
        </div>
        <!-- create account -->
        <div v-if="state.dialogIndex == CREATE_ACCOUNT" class="w-full lg:w-96  pt-20 pr-2">
            <div @click="setIndex(SELECT_ACCOUNT_MODEL)" class="btn btn-sm ml-5 text-sm  btn-outline">{{ $t('account.back') }}</div>
            <div class="w-full pt-2 pl-5 text-lg font-bold"> {{ $t('account.input_your_seed') }}</div>
            <select @change="selectWordType($event)" v-model="state.wordsType" style="max-width: 21rem; outline: none;" class="select select-bordered select-sm w-full  mt-4  ml-5">
                <option value="0">{{ $t('account.24words') }}</option>
                <option value="1">{{ $t('account.12words') }}</option>
            </select>
            <div  style="outline: none;"  class="card mt-6 bg-red-400 width-90">
                <div class="card-body text-slate-50	">
                    <h2 class="card-title">{{ $t('account.backup') }}</h2>
                    <ul >
                        <li>{{ $t('account.mnemonic_seed_tip_1') }}</li>
                        <li>{{ $t('account.mnemonic_seed_tip_2') }}</li>
                    </ul>
                </div>
            </div>
            <div class="w-full pt-10 pl-5 text-lg font-bold"> {{ $t('account.mnemonic_seed') }}</div>
            <div  style="outline: none;"  class="card mt-6 bg-slate-50 width-90">
                <div class="card-body text-black text-sm font-semibold italic leading-loose text-center	">
                    <div> {{ state.mnemonic }}</div>
                </div>
            </div>
            <div class="w-full pl-8 pt-4 pb-4 text-lg font-bold">{{ $t('account.account_name') }}</div>
            <input v-model="state.accountName" @keyup="cleanWarning()" style="outline: none;" type="text" placeholder="" class="input input-bordered width-90" />
            <label v-if="state.accountWarning" class="label pl-6">
                <span class="label-text-alt text-rose-500">{{ $t('account.account_warning') }}</span>
            </label>
            <label v-if="state.accountRepeatWarning" class="label pl-6">
                <span class="label-text-alt text-rose-500">{{ $t('account.account_repeat') }}</span>
            </label>
            <div v-if="!state.passwordExist">
                <div class="w-full pl-8 pt-4 pb-4 text-lg font-bold">{{ $t('account.password') }}</div>
                <input v-model="state.password" @keyup="cleanWarning()" style="outline: none;" type="password" paceholder="" class="input input-bordered width-90" />
                <label v-if="state.passwordWarning"  class="label pl-6 ">
                    <span class="label-text-alt text-rose-500">{{ $t('account.password_warning') }}</span>
                </label>
                <div class="w-full pl-8 pt-4 pb-4 text-lg font-bold">{{ $t('account.confirm_password') }}</div>
                <input v-model="state.confirmPassword" @keyup="cleanWarning()" style="outline: none;" type="password" placeholder="" class="input input-bordered width-90" />
                <label v-if="state.confirmPasswordWarning"  class="label pl-6 ">
                    <span class="label-text-alt text-rose-500">{{ $t('account.confirm_password_warning') }}</span>
                </label>
            </div>
            <button @click="next(CHECK_MNEMONIC_SEED);cleanMnemonicExist()" class="btn btn-outline mt-5 mb-10 capitalize width-90">{{ $t('account.next') }}</button>
        </div>
        <!-- import account -->
        <div v-if="state.dialogIndex == IMPORT_ACCOUNT" class="w-full lg:w-96  pt-20 pr-2">
            <div @click="setIndex(SELECT_ACCOUNT_MODEL)" class="btn btn-sm ml-5 text-sm  btn-outline">{{ $t('account.back') }}</div>
            <div class="w-full pt-2 pl-5 text-lg font-bold"> {{ $t('account.input_your_seed') }}</div>
            <select @change="selectWordType($event)" v-model="state.wordsType"  style="max-width: 22rem; outline: none;" class="select select-bordered select-sm w-full  mt-4  ml-5">
                <option value="0">{{ $t('account.24words') }}</option>
                <option value="1">{{ $t('account.12words') }}</option>
            </select>
            <div class="grid grid-cols-2 gap-2 pt-4  lg:grid-cols-2 gap-2 justify-center content-center">
                <div v-for="(count,index) in state.wordsType == 0 ? 24 : 12" :key="index">
                    <div class="w-full text-center relative">
                        <span class="w-8 inline-block">{{ count }}</span>
                        <input ref="mnemonicRefs" v-bind:index="index" @keyup.prevent="handleKeyDown" @paste.prevent="handlePaste" v-model="mnemonicExist[index].mnemonic" style="outline: none;" :type="mnemonicExist[index].passwordVisible?'text':'password'" placeholder="" class="input input-bordered  w-4/5 pr-10 sm:pr-12" />
                        <svg @click="togglePasswordVisibility(index)" v-if="!mnemonicExist[index].passwordVisible" class="absolute right-3 sm:right-6 md:right-10 lg:right-2 top-2"  xmlns="http://www.w3.org/2000/svg" width="28" height="29" fill="none" viewBox="0 0 28 29"><path fill="#C6C6CD" d="M23.625 25.302a.868.868 0 01-.618-.256L3.757 5.796a.875.875 0 011.237-1.237l19.25 19.25a.876.876 0 01-.619 1.493zm-9.643-3.5c-2.27 0-4.457-.671-6.504-1.996-1.863-1.203-3.54-2.926-4.85-4.977v-.004c1.09-1.562 2.284-2.884 3.567-3.949a.11.11 0 00.008-.16l-1.09-1.088a.11.11 0 00-.148-.007c-1.362 1.148-2.627 2.557-3.777 4.207a1.746 1.746 0 00-.035 1.943c1.444 2.26 3.303 4.164 5.374 5.504 2.333 1.511 4.843 2.277 7.455 2.277 1.41-.004 2.81-.237 4.145-.688a.11.11 0 00.042-.181l-1.18-1.18a.218.218 0 00-.21-.055c-.913.236-1.853.354-2.797.354zm12.861-7.951c-1.447-2.238-3.324-4.14-5.429-5.498-2.328-1.505-4.898-2.301-7.432-2.301-1.395.003-2.78.24-4.096.702a.11.11 0 00-.04.18l1.178 1.18a.219.219 0 00.212.054 10.545 10.545 0 012.746-.366c2.225 0 4.407.68 6.483 2.023 1.898 1.226 3.595 2.947 4.909 4.977a.007.007 0 01.001.004l-.001.005a16.993 16.993 0 01-3.507 3.977.109.109 0 00-.033.124.109.109 0 00.025.038l1.088 1.087a.11.11 0 00.148.007 18.784 18.784 0 003.754-4.292 1.76 1.76 0 00-.006-1.902z"></path><path fill="#C6C6CD" d="M14 9.552c-.393 0-.785.044-1.168.131a.11.11 0 00-.055.185l6.157 6.155a.11.11 0 00.185-.054A5.25 5.25 0 0014 9.552zM9.066 13.58a.11.11 0 00-.108-.028.109.109 0 00-.076.083 5.25 5.25 0 006.289 6.289.11.11 0 00.054-.185L9.066 13.58z"></path></svg>
                        <svg @click="togglePasswordVisibility(index)" v-if="mnemonicExist[index].passwordVisible" class="absolute right-3 sm:right-6 md:right-10 lg:right-2 top-2" xmlns="http://www.w3.org/2000/svg" width="28" height="29" fill="none" viewBox="0 0 28 29"><path fill="#C6C6CD" d="M14 18.302a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"></path><path fill="#C6C6CD" d="M26.843 13.85c-1.447-2.238-3.325-4.139-5.429-5.498-2.328-1.505-4.898-2.3-7.433-2.3-2.325 0-4.611.664-6.796 1.975-2.227 1.336-4.245 3.287-5.998 5.8a1.746 1.746 0 00-.035 1.944c1.445 2.26 3.303 4.164 5.375 5.504 2.332 1.511 4.843 2.277 7.454 2.277 2.555 0 5.13-.79 7.449-2.282 2.103-1.354 3.977-3.262 5.418-5.519a1.76 1.76 0 00-.005-1.9zM14 20.052a5.25 5.25 0 110-10.5 5.25 5.25 0 010 10.5z"></path></svg>
                    </div>
                </div>
            </div>
            <div class="w-full pl-8 pt-4 pb-4 text-lg font-bold">{{ $t('account.account_name') }}</div>
            <input v-model="state.accountName" @keyup="cleanWarning()" style="outline: none;" type="text" placeholder="" class="input input-bordered width-90" />
            <label v-if="state.accountWarning" class="label pl-6">
                <span class="label-text-alt text-rose-500">{{ $t('account.account_warning') }}</span>
            </label>
            <label v-if="state.accountRepeatWarning" class="label pl-6">
                <span class="label-text-alt text-rose-500">{{ $t('account.account_repeat') }}</span>
            </label>
            <div v-if="!state.passwordExist">
                <div class="w-full pl-8 pt-4 pb-4 text-lg font-bold">{{ $t('account.password') }}</div>
                <input v-model="state.password" @keyup="cleanWarning()" style="outline: none;" type="password" paceholder="" class="input input-bordered width-90" />
                <label v-if="state.passwordWarning"  class="label pl-6 ">
                    <span class="label-text-alt text-rose-500">{{ $t('account.password_warning') }}</span>
                </label>
                <div class="w-full pl-8 pt-4 pb-4 text-lg font-bold">{{ $t('account.confirm_password') }}</div>
                <input v-model="state.confirmPassword" @keyup="cleanWarning()" style="outline: none;" type="password" placeholder="" class="input input-bordered width-90" />
                <label v-if="state.confirmPasswordWarning"  class="label pl-6 ">
                    <span class="label-text-alt text-rose-500">{{ $t('account.confirm_password_warning') }}</span>
                </label>
            </div>
            <button @click="save(SUCCESSFUL)" class="btn btn-outline mt-5 mb-10 capitalize width-90">{{ $t('account.next') }}</button>
        </div>
        <!-- check mnemonic seed -->
        <div v-if="state.dialogIndex == CHECK_MNEMONIC_SEED"  class="w-full lg:w-96  pt-20">
            <div @click="setIndex(CREATE_ACCOUNT)" class="btn btn-sm ml-5 text-sm  btn-outline">{{ $t('account.back') }}</div>
            <div class="flex flex-wrap justify-start mt-6 width-90 " style="min-height: 10rem;">
                <div  @click="undoMnemonic(index)" v-for="(mnemonic,index) in state.mnemonicSort" key="index" class="btn btn-sm btn-outline m-1 lowercase text-xs text-slate-900">{{ mnemonic }}</div>
            </div>
            <div class="w-full h-px mt-10 bg-slate-200"></div>
            <div class="flex flex-wrap justify-start mt-6  width-90">
                <div @click="sortMnemonic(index)" v-for="(mnemonic,index) in state.mnemonicRandom" key="index" class="btn btn-sm btn-outline m-1 lowercase text-xs text-slate-900">{{ mnemonic }}</div>
            </div>
            <label class="label pl-6 pt-6">
                <span class="label-text-alt text-rose-500">{{ $t('account.select_mnemonic_seed_tip') }}</span>
            </label>
            <button @click="register(SUCCESSFUL)" class="btn btn-outline mt-5 mb-10 capitalize width-90">{{ $t('account.register') }}</button>
        </div>
        <!-- successful -->
        <div v-if="state.dialogIndex == SUCCESSFUL"  class="w-full lg:w-96">
            <div class="hero min-h-screen">
            <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-5xl font-bold">{{ $t('account.successful') }}</h1>
                <p class="py-6">{{ $t('account.note') }}</p>
                <button @click="succesful()" class="btn btn-outline mt-5 mb-10 capitalize width-90">{{ $t('account.done') }}</button>
            </div>
            </div>
            </div>
        </div>
        <!-- unlock -->
        <div v-if="state.dialogIndex == UNLOCK"  class="w-96 pt-40">
            <h3 class="font-bold text-lg text-center">{{ $t('wallet') }}</h3>
            <div class="w-full pt-4 pb-4 text-center text-lg font-bold pt-40">{{ $t('account.unlock_tip') }}</div>
            <input v-model="state.password" @keyup="cleanWarning()" style="outline: none;" type="password" paceholder="" class="input input-bordered width-90" />
            <label v-if="state.passwordWarning"  class="label pl-6 ">
                <span class="label-text-alt text-rose-500">{{ $t('account.unlock_failed') }}</span>
            </label>
            <button @click="unlock()" class="btn btn-outline mt-10 capitalize width-90">{{ $t('account.unlock') }}</button>
        </div>
        <!-- account list -->
        <div v-if="state.dialogIndex == ACCOUNT_LIST"  class="w-96 pt-16">
            <div class="flex justify-end mt-5">
                <div @click="setIndex(SELECT_ACCOUNT_MODEL)" class="btn btn-sm mr-2 text-sm  btn-outline capitalize">{{ $t('account.add') }}</div>
            </div>
            <div v-for="(account,index) in state.accounts" :key="index">
                <div class="navbar bg-base-100 mt-4 border-b border-slate-200 border-dotted">
                    <div class="flex-1">
                        <a class="normal-case text-xl">{{ account.name }}</a>
                        <a v-if="account.choose" class="normal-case text-xs text-zinc-500">({{ $t('account.account_selected') }})</a>
                    </div>
                    <div class="flex-none">
                        <div class="dropdown dropdown-end">
                        <label tabindex="0" class="btn-ghost m-1 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current bg-white">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                            </svg>
                        </label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 btn-ghost">
                            <li><a @click="selectAccount(account.id)" class="btn-ghost">{{ $t('account.choose') }}</a></li>
                            <li><label  @click="needToDelete(account.id)" class="btn-ghost">{{ $t('account.delete') }}</label></li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- wallet delete modal -->
            <input type="checkbox" id="delete-modal" v-model="state.deleteModal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                <h3 class="font-bold text-lg text-center">{{ $t('wallet') }}</h3>
                <p class="py-4 text-center"> {{ $t('account.delete_tip') }}</p>
                <button @click="deleteAccount" class="btn btn-outline block w-full	mt-5 capitalize">{{ $t('account.delete') }}</button>
                <div class="modal-action">
                    <label for="delete-modal" class="btn w-full	capitalize">{{ $t('cancel') }}</label>
                </div>
                </div>
            </div>
        </div>
        <!-- account detail -->
        <div v-if="state.dialogIndex == ACCOUNT_DETAIL"  class="w-96 pt-16">
            <div class="w-full text-center  pt-8 pb-4 text-sm font-bold">{{ $t('account.address') }}</div>
            <div class="tooltip tooltipc w-full" data-tip="Address copied!">
                <button @click="copyAddress()" class="border border-slate-300	border-solid rounded-lg pt-2 pb-2 pl-2 pr-2">{{ shortAddress(state.currentAddress) }}</button>
            </div>
            <div class="card bg-zinc-800 mt-16 shadow-xl image-full" style="width: 90%; margin-left: 5%;">
                <div class="card-body ">
                    <div class="w-full text-center  pt-2 pb-4 text-lg font-bold">
                        <div class="mr-2">{{$t('account.available')}}:</div>
                        <label>{{state.availableUinns}} UINNS</label>
                    </div>
                    <div class="w-full text-center  pt-1 pb-4 text-lg font-bold">
                        <div class="mr-2">{{$t('account.staked')}}:</div>
                        <label>{{state.stakedUinns}} UINNS</label>
                    </div>
                </div>
            </div>
            <button @click="setIndex(SEND)" class="btn btn-outline mt-20 " style="width: 90%; margin-left: 5%;" >{{$t('account.send')}}</button>
        </div>
        <!-- send  -->
        <div v-if="state.dialogIndex == SEND"  class="w-96 pt-16">
            <div class="w-full text-center  pt-8 pb-4 text-xl font-bold">{{ $t('navbar.title') }}</div>
            <div class="w-full pl-8 pt-4 pb-2 text-lg font-bold">{{ $t('account.recipient') }}</div>
            <input v-model="state.recipientAddress"  style="outline: none;" type="text" paceholder="" class="input input-bordered width-90" />
            <div class="w-full pl-8 pt-4 pb-2 text-lg font-bold">{{ $t('account.amount') }}</div>
            <input v-model="state.sendAmount"  style="outline: none;" type="number" paceholder="" class="input input-bordered width-90" />
            <div class="w-full pl-8 pt-4 pb-2 text-lg font-bold">{{ $t('account.memo') }}</div>
            <input v-model="state.sendMemo"  style="outline: none;" type="text" paceholder="" class="input input-bordered width-90" />    
            <div class="w-full pl-8 pt-4 pb-2 text-lg font-bold">{{ $t('account.fee') }}</div>
            <div class="width-90 btn-group">
                <button @click="setFee(LOW_FEE)" :class="state.sendFee == LOW_FEE ? 'btn-active':''" class="btn w-1/3">
                    <label class="normal-case">{{$t('account.low')}}</label>
                    <label class="normal-case">{{LOW_FEE}}uinns</label>
                </button>
                <button @click="setFee(MIDDLE_FEE)" :class="state.sendFee == MIDDLE_FEE ? 'btn-active':''" class="btn w-1/3">
                    <label class="normal-case">{{$t('account.average')}}</label>
                    <label class="normal-case">{{MIDDLE_FEE}}uinns</label>
                </button>
                <button @click="setFee(HIGH_FEE)" :class="state.sendFee == HIGH_FEE ? 'btn-active':''" class="btn w-1/3">
                    <label class="normal-case">{{$t('account.high')}}</label>
                    <label class="normal-case">{{HIGH_FEE}}uinns</label>
                </button>
            </div>
            <button @click="sendCoin()" class="btn btn-outline mt-20 width-90">{{$t('account.send')}}</button>
            <!-- send result modal -->
            <input type="checkbox" id="send-result-modal" class="modal-toggle"  v-model="state.sendResultModal"/>
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                <h3 class="font-bold text-lg text-center">{{ $t('transaction') }}</h3>
                <div style="word-wrap: break-word;word-break: break-all;"  class="py-4 text-center text-sm whitespace-pre-wrap"> {{ state.transactionMsg }}</div>
                <div class="modal-action">
                    <label for="send-result-modal" class="btn w-full	capitalize">{{ $t('close') }}</label>
                </div>
                </div>
            </div>
        </div>
        <!-- loading -->
        <loading style="background-color: #00000045;" v-model:active="state.sendLoading"
                 :can-cancel="false"
                 :is-full-page="true"/>
    </div>
</template>
<script setup lang="ts">
import {reactive,ref,onMounted} from "vue";
import cryptoJS from 'crypto-js';
import { MnemonicDB } from  '../utils/mnemonicdb'
import { PasswordDB } from  '../utils/passworddb'
import { Random, Bip39, DirectSecp256k1HdWallet,SigningCosmWasmClient} from "cosmwasm";
import {StargateClient} from "@cosmjs/stargate"
import type {StdFee} from "cosmwasm";
import useClipboard from "vue-clipboard3";
import Loading from "vue-loading-overlay";
import 'vue-loading-overlay/dist/css/index.css';

export interface State {
  endpoint:string
  dialogIndex: number
  mnemonic:string
  mnemonicRandom:Array<string>
  mnemonicSort:Array<string>
  accountName:string
  passwordExist:boolean,
  password:string
  confirmPassword:string
  accountWarning:boolean
  accountRepeatWarning:boolean
  passwordWarning:boolean
  confirmPasswordWarning:boolean,
  accounts:Array<any>,
  needToDeleteId:number,
  currentAddress:string,
  availableUinns:string,
  stakedUinns:string,
  recipientAddress:string,
  sendAmount:number,
  sendMemo:string,
  sendFee:number,
  sendResultModal:boolean,
  transactionMsg:string,
  sendLoading:boolean,
  wordsType:number;
  deleteModal:boolean,
}
defineExpose({
    async home(){
        if(state.dialogIndex != UNLOCK && state.accounts.length > 0){
            setIndex(ACCOUNT_DETAIL)
        }
    },
    add(){
        if(state.dialogIndex != UNLOCK && state.accounts.length > 0){
            setIndex(ACCOUNT_LIST)
        }
    }
})
onMounted(() => {
    passwordExist()
})
const LOW_FEE =     100000
const MIDDLE_FEE =  250000
const HIGH_FEE =    1000000
const SELECT_ACCOUNT_MODEL = 0
const CREATE_ACCOUNT = 1
const IMPORT_ACCOUNT = 2
const CHECK_MNEMONIC_SEED = 3
const SUCCESSFUL = 4
const UNLOCK = 5
const ACCOUNT_LIST = 6
const ACCOUNT_DETAIL = 7
const SEND = 8
const initialState: State = {
    endpoint:'https://rpc.inns.fun',
    dialogIndex: UNLOCK,
    mnemonic:"",
    mnemonicRandom:[],
    mnemonicSort:[],
    accountName:"",
    password:"",
    passwordExist:false,
    confirmPassword:"",
    accountWarning:false,
    accountRepeatWarning:false,
    passwordWarning:false,
    confirmPasswordWarning:false,
    accounts:[],
    needToDeleteId:-1,
    currentAddress:'',
    availableUinns:'0',
    stakedUinns:'0',
    recipientAddress:'',
    sendAmount:0,
    sendMemo:'',
    sendFee:LOW_FEE,
    sendResultModal:false,
    transactionMsg:'',
    sendLoading:false,
    wordsType:0,
    deleteModal:false
}
const mnemonicExist = reactive(
    Array(24).fill({
        passwordVisible:true,
        mnemonic:''
    })
)
const mnemonicRefs = ref<Array<HTMLInputElement> | null>(null);
const state = reactive(initialState);
const setIndex = (index: number) => {
  state.dialogIndex = index;
}
const setMnemonic = (mnemonic: string) => {
  state.mnemonic = mnemonic;
}
async function unlock() {
    if (state.password.length < 8 ){
        state.passwordWarning = true;
        return false
    } 
    const hash = cryptoJS.SHA256(state.password)
    const password  = await getPasswordHash()
    if(password === hash.toString()){
        state.dialogIndex = ACCOUNT_DETAIL
        await accounts()
        loadAccount(state.currentAddress)
    }else{
        state.passwordWarning = true;
    }
}
async function handlePaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    if (clipboardData) {
        const clipboardText = clipboardData.getData("text")
        clipboardText.split(' ').forEach((mnemonic,index)=>{
            mnemonicExist.splice(index, 1, { ...mnemonicExist[index], mnemonic: mnemonic, passwordVisible:false })
        })
    }
}
async function handleKeyDown(event: KeyboardEvent) {
    if (event.metaKey && event.code === 'KeyV' || event.ctrlKey && event.key === 'v') {
      const clipboardText = await navigator.clipboard.readText();
      clipboardText.split(' ').forEach((mnemonic,index)=>{
            mnemonicExist.splice(index, 1, { ...mnemonicExist[index], mnemonic: mnemonic, passwordVisible:false })
        })
    }
}
async function createMnemonic() {
    const entropy = await Random.getBytes(state.wordsType == 0 ? 32:16);
    console.log("Entropy:", entropy);
    const mnemonic = await Bip39.encode(entropy).toString();
    console.log("Mnemonic:", mnemonic)
    setMnemonic(mnemonic)
    state.mnemonicRandom =  mnemonic.split(" ")
    state.mnemonicRandom.sort(randomSort)
    console.log(state.mnemonicRandom)
}
async function next(index:number) {
    if(await checkInput()){  
        setIndex(index)
    }
}
async function checkInput():Promise<boolean>{
    var warring = true
    if (state.accountName.length < 1){
        state.accountWarning = true
        warring = false
    }
    const db = new MnemonicDB()
    const names = await db.selectByName(state.accountName.toString())
    if(names.length > 0){
        state.accountRepeatWarning = true
        warring = false
    }
    if (!state.passwordExist && (state.password.length < 8 || state.password !== state.confirmPassword)){
        state.passwordWarning = true
        state.confirmPasswordWarning = true
        warring = false
    }   
    return warring
}
async function savePassword(password:string){
    var hash = cryptoJS.SHA256(password);
    const db = new PasswordDB()
    await db.add(hash.toString())
}
async function getPasswordHash(){
    const db = new PasswordDB();
    const passwods =  await db.selectAll();
    if(passwods && passwods.length > 0){
        return passwods[0].password
    }
    return "";
}
async function passwordExist(){
    const passwods = await getPasswordHash()
    if(passwods.length > 0){
        state.passwordExist = true
        state.dialogIndex = UNLOCK
    }else{
        state.passwordExist = false
        state.dialogIndex = SELECT_ACCOUNT_MODEL
    }
}
async function accounts(){
    const db = new MnemonicDB()
    state.accounts = await db.selectAll()
    for(var i=0; i<state.accounts.length; i++){
        if(state.accounts[i].choose){
            const decrypt = decryptMnemonic(state.password, state.accounts[i].mnemonic,state.accounts[i].iv)
            if(decrypt){
                let wallet = await DirectSecp256k1HdWallet.fromMnemonic(decrypt, {
                    prefix: "inns",
                })
                let address= await wallet.getAccounts()
                state.currentAddress = address[0].address
            }
       }
    }
}
async function save(index:number){
    state.sendLoading = true
    const elements = mnemonicRefs.value as Array<HTMLInputElement>;
    elements.sort((a, b)=>{
        return Number(a.getAttribute("index")) - Number(b.getAttribute("index"));
    });
    var mnemonicText = ''
    elements.forEach((item)=>{
        mnemonicText += item.value + ' '
    })
    if(await checkInput() && mnemonicText.trim().split(' ').length == (state.wordsType == 0 ? 24: 12)){
        let wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonicText.trim(), {
            prefix: "inns",
        })
        let address= await wallet.getAccounts()
        if(address[0].address != undefined && address[0].address.length > 0){
            const iv = Random.getBytes(32).toString()
            const encryptedMnemonic = encryptMnemonic(state.password.toString(),mnemonicText.trim(),iv)
            const db = new MnemonicDB()
            const id = await db.add(encryptedMnemonic, state.accountName.toString(),iv)
            if(!state.passwordExist){
                await savePassword(state.password)
                await db.choose(id)
            }
            await accounts()
            await loadAccount(address[0].address)
            setIndex(index)
        }
    }
    state.sendLoading = false
}
async function register(index:number){
    state.sendLoading = true
    var mnemonicSortString = ""
    state.mnemonicSort.forEach((item)=>{
        mnemonicSortString += item + " "
    })

    if(await checkInput() && mnemonicSortString.trim() === state.mnemonic.trim()){
        let wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonicSortString.trim(), {
            prefix: "inns",
        })
        let address= await wallet.getAccounts()
        if(address[0].address != undefined && address[0].address.length > 0){
            const iv = Random.getBytes(32).toString()
            const encryptedMnemonic = encryptMnemonic(state.password.toString(),state.mnemonic.toString(),iv)
            const db = new MnemonicDB()
            const id = await db.add(encryptedMnemonic, state.accountName.toString(),iv)
            if(!state.passwordExist){
                await savePassword(state.password.toString())
                await db.choose(id)
            }
            await accounts()
            await loadAccount(address[0].address)
            setIndex(index)
        }
    }
    state.sendLoading = false
}
async function selectAccount(id:number){
    const db = new MnemonicDB()
    state.accounts.forEach((item)=>{
        if(item.id === id){
            db.choose(item.id)
        }else{
            db.unchoose(item.id)
        }
    })
    await accounts()
    const elem = document.activeElement as HTMLInputElement;
    if(elem){
      elem?.blur();
    }
    setIndex(ACCOUNT_DETAIL)
    loadAccount(state.currentAddress)
}
async function loadAccount(address:string){
    const stargateClient = await StargateClient.connect(state.endpoint)
    const amount = (await stargateClient.getBalance(address,'uinns'))
    const staked = await stargateClient.getBalanceStaked(address)
    if(amount){
        state.availableUinns = amount.amount
    }else{
        state.availableUinns = '0'
    }
    if(staked){
        state.stakedUinns = staked.amount
    } else {
        state.stakedUinns = '0'
    }
}
async function deleteAccount(){
    const db = new MnemonicDB()
    await db.del(state.needToDeleteId)
    await accounts()
    if(state.accounts.length == 0){
        const db = new PasswordDB()
        await db.clear()
        state.dialogIndex = SELECT_ACCOUNT_MODEL
        state.passwordExist = false
        state.password = ''
    }
    state.deleteModal = false
}
async function copyAddress(){
    const { toClipboard } = useClipboard();
    try {
        await toClipboard(state.currentAddress);
    } catch (e) {
        console.log(e);
    }
}
async function sendCoin(){
    state.sendLoading = true
    var mnemonic = ''
    for(var i=0; i<state.accounts.length; i++){
        if(state.accounts[i].choose){
            mnemonic = decryptMnemonic(state.password, state.accounts[i].mnemonic,state.accounts[i].iv)
            break;
        }
    }
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix: "inns"})
    const client = await SigningCosmWasmClient.connectWithSigner(state.endpoint, wallet);
    const fee : StdFee = {
        amount:[{
            denom: 'uinns',
            amount: state.sendFee.toString()
        }],
        gas:state.sendFee.toString()
    }
    const amount = [
        {
            denom:'uinns', 
            amount:state.sendAmount.toString()
        }
    ]
    try{
        const txResponse = await client.sendTokens(state.currentAddress, state.recipientAddress, amount, fee)
        console.log(txResponse)
        state.sendResultModal = true
        if(txResponse.code == 0){
            state.transactionMsg = "Transaction success\r\n GasUsed:" + txResponse.gasUsed + "uinns\r\n Transaction hash: \r\n"+ txResponse.transactionHash
        }else{
            state.transactionMsg = txResponse.rawLog || 'Unknown Error'
        }
    }catch(e:any){
        state.sendResultModal = true
        state.transactionMsg = e.message
    }finally{
        state.sendLoading = false
    }
}
async function succesful(){
    await accounts()
    setIndex(ACCOUNT_DETAIL)
}
function setFee(fee: number) {
    state.sendFee = fee
}
function shortAddress(address:string){
    return address.substring(0,15) + '......' + address.substring(address.length -15,address.length)
}
function needToDelete(id:number) {
    state.needToDeleteId = id
    state.deleteModal = true
}
function encryptMnemonic(password:string, mnemonic:string,ivstr:string):string{
    var hash = cryptoJS.SHA256(password)
    let keyArray = cryptoJS.lib.WordArray.create(hash.words, 32).toString()
    const iv = cryptoJS.enc.Utf8.parse(ivstr)
    let srcs = cryptoJS.enc.Utf8.parse(mnemonic)
    let encrypted = cryptoJS.AES.encrypt(srcs, keyArray, { iv: iv, mode: cryptoJS.mode.CBC, padding: cryptoJS.pad.Pkcs7 })
    return encrypted.toString()
}
function decryptMnemonic(password:string,  encryptMnemonic:string,ivstr:string):string{
    var hash = cryptoJS.SHA256(password)
    let keyArray = cryptoJS.lib.WordArray.create(hash.words, 32).toString()
    const iv = cryptoJS.enc.Utf8.parse(ivstr)
    let decrypt = cryptoJS.AES.decrypt(encryptMnemonic.toString(), keyArray, { iv: iv, mode: cryptoJS.mode.CBC, padding: cryptoJS.pad.Pkcs7 })
    let decryptedStr = decrypt.toString(cryptoJS.enc.Utf8)
    return decryptedStr.toString()
}
function sortMnemonic(index:number){
    state.mnemonicSort.push(state.mnemonicRandom[index])
    state.mnemonicRandom.splice(index, 1);
}
function undoMnemonic(index:number){
    state.mnemonicRandom.push(state.mnemonicSort[index])
    state.mnemonicSort.splice(index, 1);
}
function cleanWarning(){
    state.accountWarning = false;
    state.passwordWarning = false;
    state.confirmPasswordWarning = false;
    state.accountRepeatWarning = false;
}
function cleanMnemonicExist(){
    mnemonicExist.forEach((mnemonic, index)=>{
        mnemonicExist.splice(index, 1, { ...mnemonicExist[index], mnemonic: '', passwordVisible:false })
    })
    state.mnemonicSort=[]
    state.mnemonicRandom =  state.mnemonic.split(" ")
    state.mnemonicRandom.sort(randomSort)
}
function togglePasswordVisibility(index:number) {
    mnemonicExist.splice(index, 1, { ...mnemonicExist[index], mnemonic: mnemonicExist[index].mnemonic, passwordVisible:!mnemonicExist[index].passwordVisible })

}
function randomSort(a:String, b:String) {
    return Math.random() > .5 ? 1 : -1;
}
function selectWordType(event:any){
    state.wordsType =  event.target.value
    createMnemonic()
}
</script>
<style>
.width-90{
    width: 90%;
    margin-left: 5%;
}
.tooltipc::before {
    max-width: 26rem !important;
}
</style>
  