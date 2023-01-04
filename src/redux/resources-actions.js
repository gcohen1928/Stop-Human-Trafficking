import {resourcesActions} from './resources-slice';
import {fetchResources} from '../../firebase';

export const getResources = () => {
    return async (dispatch) => {
      try {
        const res = await fetchResources();
        res.forEach((county) => {
            if(county.coords){
                county.coords = {latitude: county.coords.latitude, longitude: county.coords.longitude}
            } 
        })
        dispatch(resourcesActions.setResources(res));
      } catch (err) {
          //alert("Something went wrong, please try again later")
          console.log(err)
          return false
      }
    };
  };
  