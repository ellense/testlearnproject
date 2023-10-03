import { defineStore } from "pinia";

interface IMultiplyStore {
    number1: number;
    number2: number;
    result: number;
    history: string[];
}

export const useMultiplyStore = defineStore("MultiplyStore", {
    state: (): IMultiplyStore => ({
      number1: 0,
      number2: 0,
      result: 0,
      history: [],
    }),
    getters: {
      getResult: (state) => state.result,
      getNumber1: (state) => state.number1,
      getNumber2: (state) => state.number2,
    },
    actions: {
      multiply() {
        this.$state.result = this.$state.number1 * this.$state.number2;
        this.$state.history.push(`${this.number1} * ${this.number2} = ${this.result}`);
      },
    },
  });
  
