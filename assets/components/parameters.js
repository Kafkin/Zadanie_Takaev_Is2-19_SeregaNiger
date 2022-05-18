export default {
  template: `
    <div class="parameters__container">
      <span class="parameters__span parameters__span_one">
        <button v-for="(item, index) in arrayParametersOne" :key="index"
        :class="{ active__btn:index === parametersOne }"
        @click="oneParameters(index)"> {{ item.title }} </button>
      </span>

      <span class="parameters__span parameters__span_two">
        <button v-for="(item, index) in arrayParametersTwo" :key="index"
        :class="{ active__btn:index === parametersTwo }"
        @click="twoParameters(index)"> {{ item.title }} </button>
      </span>
    </div>

    <span class="card__span">
      <p>от {{ card.price + newPrice }} ₽</p>
      <button @click="add(card, amount)" :class="{ active__buyBtn:amount >= 1 }">
      <a href="#" class="card__svg"></a>
        Добавить
      <span class="number__span" v-if="!!amount">{{ amount }}</span>
      </button>
    </span>
  `,

  data(){
    return{
      arrayParametersOne: [
        {id: 0, title: 'тонкое', price: 0},
        {id: 1, title: 'традиционное', price: 43}
      ],

      arrayParametersTwo: [
        {id: 0, title: '26 см.', price: 0},
        {id: 1, title: '30 см.', price: 23},
        {id: 2, title: '40 см.', price: 57}
      ],

      amount: 0,
      parametersOne: 0,
      parametersTwo: 0,
    }
  },

  methods:{
    add(card){
      this.amount++
      console.log('start... parameters');
      const newPrice = card.price + this.newPrice
      this.$emit('add', {
        ...card,
        amount: this.amount,
        parametersOne: this.arrayParametersOne[this.parametersOne].title,
        parametersTwo: this.arrayParametersTwo[this.parametersTwo].title,
        price: newPrice,
        parametersOneIndex: this.parametersOne,
        parametersTwoIndex: this.parametersTwo
      })
      // ----------------------------------------------------------------
      localStorage.setItem(`${this.card.title}, ${this.parametersOne}, ${this.parametersTwo}`, JSON.stringify({
        ...card,
        amount: this.amount,
        parametersOne: this.arrayParametersOne[this.parametersOne].title,
        parametersTwo: this.arrayParametersTwo[this.parametersTwo].title,
        price: newPrice,
        parametersOneIndex: this.parametersOne,
        parametersTwoIndex: this.parametersTwo
      }))
      // ----------------------------------------------------------------
      // localStorage.setItem(`${this.card.title}-amount`, JSON.stringify(this.amount))
    },

    oneParameters(index){
      this.parametersOne = index
      localStorage.setItem(`${this.card.title}-parametersOne`, JSON.stringify(this.parametersOne))
      const res = localStorage.getItem(`${this.card.title}, ${this.parametersOne}, ${this.parametersTwo}`)
      const data = JSON.parse(res)
      if(!!data){
        this.amount = data.amount
      }else{
        this.amount = 0
      }
    },

    twoParameters(index){
      this.parametersTwo = index
      localStorage.setItem(`${this.card.title}-parametersTwo`, JSON.stringify(this.parametersTwo))
      const res = localStorage.getItem(`${this.card.title}, ${this.parametersOne}, ${this.parametersTwo}`)
      const data = JSON.parse(res)
      if(!!data){
        this.amount = data.amount
      }else{
        this.amount = 0
      }
    },
  },

  watch:{
    
  },

  computed:{
    newPrice(){
      return this.arrayParametersOne[this.parametersOne].price + this.arrayParametersTwo[this.parametersTwo].price
    }
  },

  props:{
    card:{
      type: Object
    }
  },

  created(){
    
  },

  async mounted(){
    // const res = await localStorage.getItem(`${this.card.title}-amount`)
    // if(!!res){
    //   this.amount = JSON.parse(res)
    // }else{
    //   this.amount = 0
    // }
    // -------------------------------------------------------------------
    const resOne = await localStorage.getItem(`${this.card.title}-parametersOne`)
    if(!!resOne){
      this.parametersOne = JSON.parse(resOne)
    }else{
      this.parametersOne = 0
    }
    // -------------------------------------------------------------------
    const resTwo = await localStorage.getItem(`${this.card.title}-parametersTwo`)
    if(!!resTwo){
      this.parametersTwo = JSON.parse(resTwo)
    }else{
      this.parametersTwo = 0
    }
    // -------------------------------------------------------------------
    const res = localStorage.getItem(`${this.card.title}, ${this.parametersOne}, ${this.parametersTwo}`)
    const data = JSON.parse(res)
    if(!!data){
      this.amount = data.amount
    }else{
      this.amount = 0
    }
  },
}