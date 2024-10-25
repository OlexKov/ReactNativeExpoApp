import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface ConfirmationCardProps {
  onConfirm: Function,
  onCancel: Function,
  title: string,
  isVisible: boolean
}
export const Confirmation: React.FC<ConfirmationCardProps> = ({ title, isVisible, onConfirm, onCancel }): React.JSX.Element => {

  const confirmAction = async () => await onConfirm();
  const cancelAction = () => onCancel();
  return (
    <Modal
      animationType="fade" // Анімація відкриття
      transparent={true} // Прозорість фону
      visible={isVisible} // Відкриття модального вікна залежно від стану
      onRequestClose={cancelAction} // Закриття модального вікна при натисканні назад
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmAction}>
              <Text style={styles.buttonText}>Так</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelAction}>
              <Text style={styles.buttonText}>Ні</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Прозорий чорний фон
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});