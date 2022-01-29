import {$authHost} from "./index";

export const fetchBasket = async () => {
  return await $authHost.get('api/basket')
}

export const addToBasket = async (deviceId) => {
  return await $authHost.post('api/basket', {deviceId})
}

export const deleteFromBasket = async (id) => {
  return await $authHost.delete('api/basket', {
    data: {id}
  })
}