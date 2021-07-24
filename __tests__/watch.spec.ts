// import { useReactive, reactive, watch, ref } from '@/veact/src';

// const inputState = reactive({
//   value: '',
//   isEdit: false,
// });

// const test = ref(false);

// ref
// watch(test, (refTest) => {
//   console.log('------ref change', refTest);
// });

// function ref
// watch(
//   () => test.value,
//   (refTest) => {
//     console.log('------function ref change', refTest);
//   }
// );

// array function ref
// watch(
//   () => [test.value],
//   (refTest) => {
//     console.log('------array function ref change', refTest);
//   }
// );

// array ref
// watch([test], (refTest) => {
//   console.log('------array ref change', refTest);
// });

// reactive
// watch(inputState, (currentValue, prevValue) => {
//   console.log(
//     '------reactive change',
//     JSON.stringify(currentValue),
//     JSON.stringify(prevValue)
//   );
// });

// function reactive cloneDeep
// watch(
//   () => _.cloneDeep(inputState),
//   (currentValue, prevValue) => {
//     console.log('------function reactive change', currentValue, prevValue);
//   }
// );

// function reactive deep
// watch(
//   () => inputState,
//   (currentValue, prevValue) => {
//     console.log('------function reactive change', currentValue, prevValue);
//   },
//   { deep: true }
// );

// array reactive
// watch([inputState], (currentValue, prevValue) => {
//   console.log('------function reactive change', currentValue, prevValue);
// });

// function array mixin
// watch(
//   () => [inputState, test],
//   (currentValue, prevValue) => {
//     console.log('------function array mixin deep', currentValue, prevValue);
//   }
// );

// array mixin
// watch([inputState, test], (currentValue, prevValue) => {
//   console.log('------array mixin change', currentValue, prevValue);
// });
