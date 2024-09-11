import SideBar from "../component/SideBar";
import Map from "../component/Map";
import styles from './AppLayout.module.css'
import User from "../component/User";

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User/>
    </div>
  );
};

export default AppLayout;