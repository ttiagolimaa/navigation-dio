import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import * as S from './styles';

import api from '../../services/api'

export default function Techs() {
  const [loading, setLoading] = useState(false);
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');

  const navigation = useNavigation()

  async function handleAddTech() {
    setLoading(true)

    const { data } = await api.post('/techs/', {
      id: newTech,
    });

    setTechs([...techs, data])

    setLoading(false)
    setNewTech(null)
    Keyboard.dismiss()
  }

  async function handleDeleteTech(id) {

    await api.delete(`/techs/${id}`);
    const filteredTechs = techs.filter(item => item.id !== id)
    setTechs(filteredTechs)
  }

  function navigationToDetail(tech) {
    navigation.navigate('TechDetails',{tech})
  }

  return(
    <S.Container>
      <S.Form>
        <S.Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder='Adicionar Tecnologia'
          value={newTech}
          onChangeText={setNewTech}
          returnKeyType='send'
          onSubmitEditing={()=>{}}
          />
          <S.SubmitButton loading={loading} onPress={handleAddTech}>
            {loading ? (
              <ActivityIndicator color='#fff'/>
            ) : (
              <Icon name='add' size={20} color='#fff' />
            )}
          </S.SubmitButton>
      </S.Form>
      <S.List
        data={techs}
        keyExtractor={tech => tech.id}
        renderItem={({item}) => (
          <S.Tech>
            <S.Name>{item.id}</S.Name>

            <S.ProfileButton background='#ffc107' onPress={()=> navigationToDetail(item)}>
              <Icon name='design-services' size={20} color='#fff'/>
            </S.ProfileButton>

            <S.ProfileButton background='#e0a800' onPress={()=> handleDeleteTech(item.id)}>
              <Icon name='delete' size={20} color='#fff'/>
            </S.ProfileButton>

          </S.Tech>
        )}/>
    </S.Container>
  )
}
