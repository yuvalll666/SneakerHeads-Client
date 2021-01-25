import React from "react";
import "../../css/PageHeader.css";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((them) => ({
  message: {
    fontSize: "1.3em",
    display: "flex",
    margin: "0 auto",
    fontWeight: "600",
    justifyContent: "center",
  },
}));
function PageHeader({ children, props }) {
  const styles = useStyles();
  return (
    <React.Fragment>
      <div className="header-container mb-4">
        <div className="container">
          <div className="header-title" {...props}>
            {children}
          </div>
        </div>
      </div>
      {children == "Home" && (
        <div>
          <div className={styles.message}>
            <div>Example Site Products Not For Sale!</div>
          </div>
          <hr />
        </div>
      )}
    </React.Fragment>
  );
}

export default PageHeader;
