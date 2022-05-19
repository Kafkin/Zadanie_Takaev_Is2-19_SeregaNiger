import vCard from "../assets/components/card.js"
import vCart from "../assets/components/cart.js"

Vue.createApp({
// ------------

  data(){

    return{
      arrayBtn: [
        { title: 'Все'             },
        { title: 'Мясные'          },
        { title: 'Вегетарианская'  },
        { title: 'Гриль'           },
        { title: 'Острые'          },
        { title: 'Закрытые'        }
      ],

      arrayFilters: [
        {id: 0,  title: "Популярности"  },
        {id: 1,  title: "Цене"          },
        {id: 2,  title: "Алфовиту"      }
      ],

      activeBtn: 0,
      activeFilters: 0,

      activeBtnName: "Все",
      activeFiltersName: "Популярности",

      filterShow: false,
      currentPage: 'home',
      loaderShow: true,
      messagePizzaRerror: false,
      shake: false,

      pizzaArray: [],
      shoppingCartArray: [],

      money: 1350
    }
  },

  methods: {
    switchFilter(el, index){
      this.activeFilters = index,
      this.activeFiltersName = el.title
    },

    switchBtn(el, index){
      this.activeBtnName = el.title
      this.activeBtn = index
    },

    add(card){
      console.log('index... stop');
      const answer = this.shoppingCartArray.findIndex(el => el.title === card.title && el.price === card.price)

      answer === -1 ? (() => {
        console.log('не найден')
        this.shoppingCartArray.push(card)
        console.log(this.shoppingCartArray)
      })() : (() => {
        console.log('найден')
        this.shoppingCartArray[answer] = card
        console.log(this.shoppingCartArray)
      })()
    },

    minus(title){
      console.log(title)
      const index = this.shoppingCartArray.findIndex(el => el.title == title)
      console.log(index);
      this.shoppingCartArray.splice(index, 1)
    },

    del(card){
      console.log(card);
      const index = this.shoppingCartArray.findIndex(el => el.title == card.title && el.parametersOneIndex == card.parametersOneIndex && el.parametersTwoIndex == card.parametersTwoIndex)
      this.shoppingCartArray.splice(index, 1)
    },

    delAll(){
      this.shoppingCartArray = []
      localStorage.clear()
    },

    EmptyMoneyShow(){
      const newDateMoney = this.money - this.sumCart
      if(newDateMoney >= 0){
        this.money = newDateMoney
        this.currentPage = 'home'
        this.shoppingCartArray = []
        localStorage.clear()
      }else{
        this.shake = true
        setTimeout(() => {
          this.shake = false
        }, 1000)
      }
    }
  },

  computed: {
    mainArray(){
      if(this.activeBtnName === 'Все'){
        // --------------------------------------------------------------------------
        if(this.activeFiltersName === 'Популярности'){
          return [...this.pizzaArray].sort((a, b) => a.viewed > b.viewed ? -1 : 1)
        }

        if(this.activeFiltersName === 'Цене'){
          return [...this.pizzaArray].sort((a, b) => a.price > b.price ? -1 : 1)
        }

        if(this.activeFiltersName === 'Алфовиту'){
          return [...this.pizzaArray].sort((a, b) => a.title < b.title ? -1 : 1)
        }
        // --------------------------------------------------------------------------
      }else{
        // --------------------------------------------------------------------------
        if(this.activeFiltersName === 'Популярности'){
          const array = this.pizzaArray.filter(el => el.filter === this.activeBtnName)
          return array.sort((a, b) => a.viewed > b.viewed ? -1 : 1)
        }

        if(this.activeFiltersName === 'Цене'){
          const array = this.pizzaArray.filter(el => el.filter === this.activeBtnName)
          return array.sort((a, b) => a.price > b.price ? -1 : 1)
        }

        if(this.activeFiltersName === 'Алфовиту'){
          const array = this.pizzaArray.filter(el => el.filter === this.activeBtnName)
          return array.sort((a, b) => a.title < b.title ? -1 : 1)
        }
        // --------------------------------------------------------------------------
      }
    },

    sumCart(){
      return this.shoppingCartArray.reduce((total, item) => {
        return total + (item.price * item.amount)
      }, 0)
    },

    amountCart(){
      return this.shoppingCartArray.reduce((total, item) => {
        return total + item.amount
      }, 0)
    }
  },

  components: {
    vCard,
    vCart
  },

  async created(){
    var error = null

    try {
      const res = await fetch('https://6282938ced9edf7bd886bc0a.mockapi.io/pizzaApi')
      const date = await res.json()
      this.pizzaArray = date
    }catch(err) {
      var error = err
      console.error('Ошибка ' + err);
    }finally {
      if(!!error){
        this.loaderShow = false
        this.messagePizzaRerror = true
      }else{
        this.loaderShow = false
      }
    }

    localStorage.clear()
  },

  async mounted(){

  }

// ------------
}).mount('#app')
