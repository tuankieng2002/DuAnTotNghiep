import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  green: {
    padding: 10,
    borderRadius: 6,
    color: '#22A45D',
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },

  button: {
    backgroundColor: '#22A45D',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    height: 38,
    width: '30%',
    alignItems: 'center',
    margin: 6,
  },
  textContent: {
    color: '#010F07',
    fontSize: 16,
    fontWeight: '500',
  },
  textClear: {
    color: '#010F07',
    fontWeight: '500',
    fontSize: 12,
  },
  text: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#F1F1F1',
  },
  filter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  all: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 18,
  },
});

export default styles;
