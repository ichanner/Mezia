import {emit} from './index';

export const joinRoom = (roomId)=>{

	emit('/room/join', {roomId: roomId});
};

export const sendPeerId = (roomId)=>{

	emit('/room/update_peers', {roomId: roomId});
};