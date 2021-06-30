import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import mongoose from 'mongoose'

export const renderAdminChart = async () => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-elixir-iljeo",
    height: "400px",
    theme: "dark",
    background: "#4d4d4d"
  });

  const chart = sdk.createChart({
    chartId: "80fceecc-1d04-4678-99c8-9e863c9be9e4"
  });
  await chart.render(document.querySelector("#incomeChart"))
  await chart.refresh()
}


export const renderSellerChart = async (id) => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-elixir-iljeo",
    height: "500px",
    theme: "dark",
    background: "#4d4d4d"
  })

  const chart = sdk.createChart({
    chartId: "09ab0ec5-8e15-467b-900a-360aa5f2e78e",
  })
  console.log(id);
  await chart.render(document.querySelector("#apex1"))
  await chart.setFilter({ "sellerId": mongoose.Types.ObjectId(id) })
  await chart.refresh()

}

export const renderOrderChart = async (id) => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-elixir-iljeo",
    height: "450px",
    theme: "dark",
    background: "#4d4d4d"
  })

  const chart = sdk.createChart({
    chartId: "1d21a2d1-fee7-4b00-8cae-f7e339820598",
  })
  await chart.render(document.querySelector("#orderChart"))
  await chart.setFilter({ "sellerId": mongoose.Types.ObjectId(id) })
  await chart.refresh()
}

export const userChart = async () => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-elixir-iljeo",
    height: "450px",
    theme: "dark",
    background: "#4d4d4d"
  })
  const chart = sdk.createChart({
    chartId: "c103016b-809b-4a6c-a913-0d645ba95a8c",
  })
  await chart.render(document.querySelector("#apex1"))
  await chart.refresh()
}

export const donutUserChart = async () => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-elixir-iljeo",
    height: "450px",
    theme: "dark",
    background: "#4d4d4d"
  })
  const chart = sdk.createChart({
    chartId: "7cc22d03-fba8-4e45-9059-d4992a2a0453",
  })
  await chart.render(document.querySelector("#donutUserChart"))
  await chart.refresh()
}

export const w3_open = async () => {
  document.getElementById("mySidebar").style.display = "block";
}

export const w3_close = async () => {
  document.getElementById("mySidebar").style.display = "none";
}