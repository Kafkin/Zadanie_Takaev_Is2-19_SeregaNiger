import vParameters from './parameters.js'

export default {
  template: `
    <div class="card">
      <img :src="'./assets/img/' + card.img" :alt="card.title" class="card__img" />
      <p class="card__title">{{ card.title }}</p>
      <vParameters :card="card" @add="add"></vParameters>
    </div>
  `,

  data(){
    return{
      
    }
  },

  methods:{
    add(card){
      console.log('card');
      this.$emit('add', card)
    }
  },

  props:{
    card:{
      type: Object
    }
  },

  components: {
    vParameters,
  }
}