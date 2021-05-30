import service from "./service";
import store from "../store";

export default function (args) {
  return service({
    ...args,
    headers: {
      accessToken: store.state.token
    }
  })
}