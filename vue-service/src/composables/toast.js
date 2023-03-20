import {ref, onUnmounted} from 'vue';


export const useToast = () => {
    onUnmounted( () => { // 페이지 떠났을 때 호출
        console.log('unmounted');
        clearTimeout(timeout.value); // 3초 후 작업을 클리어시켜주는 것
        // 페이지 떠났는데 timeout 해줄필요 없어서 작업 취소해주는 것 -> 메모리 누수 예방
    });
    
    
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const timeout = ref(null);
    
    const triggerToast = (message, type = 'success') => {
        showToast.value = true;
        toastMessage.value = message;
        toastAlertType.value = type;
        timeout.value = setTimeout(() => {
            console.log('in triggerToast');
            toastMessage.value = '';
            showToast.value = false;
            toastAlertType.value = '';
        }, 3000);
    }
    
    return{
        showToast,
        triggerToast,
        toastMessage,
        toastAlertType,
        timeout,
    };
}