export default {
  template: `
    <div class="buy__card">
      <img src="./assets/img/pizzaImgOne.jpg" :alt="card.title">
      <span class="buy__card_header">
        <h2 class="buy__card_title">{{ card.title }}</h2>
        <p class="buy__card_subtitle">{{ card.parametersOne }}, {{ card.parametersTwo }}</p>
      </span>

      <div class="buy__card_box">
        <span class="buy__card_main">
          <button @click="minusAmount(card)"> <a href="#" class="svg__btn svg__btn_one"></a> </button>
          <p>{{ card.amount }}</p>
          <button @click="plusAmount(card)"> <a href="#" class="svg__btn svg__btn_two"></a> </button>
        </span>

        <h2 class="buy__card_price">{{ amountCart(card) }} ₽</h2>

        <button class="exit" @click="deleteCard(card)"> <a href="#"></a> </button>
      </div>
    </div>
  `,

  data(){
    return{
      
    }
  },
  
  computed:{
    
  },

  methods:{
    amountCart(card){
      return (card.price * card.amount)
    },

    minusAmount(card){
      if(!!(card.amount-1)){
        card.amount--
        // -------------------------------------
        const res = localStorage.getItem(`${card.title}, ${card.parametersOneIndex}, ${card.parametersTwoIndex}`)
        const data = JSON.parse(res)
        data.amount--
        localStorage.setItem(`${card.title}, ${card.parametersOneIndex}, ${card.parametersTwoIndex}`, JSON.stringify(data))
        // -------------------------------------
      }else{
        console.log('start');
        this.$emit('minus', card.title)
        localStorage.removeItem(`${card.title}, ${card.parametersOneIndex}, ${card.parametersTwoIndex}`)
      }
    },

    deleteCard(card){
      this.$emit('del', card)
      localStorage.removeItem(`${card.title}, ${card.parametersOneIndex}, ${card.parametersTwoIndex}`)
    },

    plusAmount(card){
        card.amount++
        // -------------------------------------
        const res = localStorage.getItem(`${card.title}, ${card.parametersOneIndex}, ${card.parametersTwoIndex}`)
        const data = JSON.parse(res)
        data.amount++
        localStorage.setItem(`${card.title}, ${card.parametersOneIndex}, ${card.parametersTwoIndex}`, JSON.stringify(data))
        // -------------------------------------
    }
  },

  props:{
    card:{
      type: Object
    }
  },
}