import { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { apiUrl } from "../config.json";
import http from "../services/httpService";

function Confirmation(props) {
  const history = useHistory();
  const { addToast } = useToasts();
  const params = props.match.params.token;

  /**
   * On page load move to Sign in page
   */
  useEffect(async () => {
    await http
      .post(`${apiUrl}/users/verify`, { params })
      .then((res) => {
        if (res && res.data) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    addToast("User have been confirmed!", { appearance: "success" });
    history.push("/signin");
  }, []);

  return null;
}

export default Confirmation;
