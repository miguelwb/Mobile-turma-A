import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Register() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Aluno', value: 'aluno' },
    { label: 'Motorista', value: 'motorista' },
  ]);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cnh: "",
    ra: "",
    senha: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showToastErrorEmail, setShowToastErrorEmail] = useState(false);
  const [showToastErrorPassword, setShowToastErrorPassword] = useState(false);
  const [showToastAllFields, setShowToastAllFields] = useState(false);
  const [showToastServerError, setShowToastServerError] = useState(false);
  const [showToastError, setShowToastError] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    console.log("Submitando:", form, value);
    const isAluno = value === 'aluno';
    const isMotorista = value === 'motorista';

    if (!form.nome || !form.email || !form.senha) {
      setShowToastAllFields(true);
      return;
    }

    if (isAluno && !form.ra) {
      setShowToastAllFields(true);
      return;
    }

    if (isMotorista && !form.cnh) {
      setShowToastAllFields(true);
      return;
    }

    if (!validateEmail(form.email)) {
      setShowToastErrorEmail(true);
      return;
    }

    if (form.senha.length < 6) {
      setShowToastErrorPassword(true);
      return;
    }

    setIsLoading(true);

    try {
      const alunoPayload = {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        ra: isAluno ? form.ra.replace(/\D/g, "") : undefined,
        cnh: isMotorista ? form.cnh.replace(/\D/g, "") : undefined,
      };

      const response = await fetch("https://backend-mobilize-transporte.onrender.com/api/alunos/adicionar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alunoPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log('Erro da API:', data);
        setShowToastError(true);
        return;
      }

      // if (data.alunoId) {
      //   async function fetchAluno(){
      //     try{
      //       const response = await fetch(`https://backend-mobilize-transporte.onrender.com/api/alunos/getId/${alunoId}`, 
      //         headers: {
      //           "Content-Type": "application/json"
      //         },
      //       )
      //       const data = await response.json();
            
      //     } catch (error){
      //       throw new error;
      //       console.log(error);
      //     }
      //   }
      // }

      setModalVisible(true);
    } catch (error) {
      console.error("Erro completo:", error);
      setShowToastServerError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['rgba(17,95,140,1)', 'rgba(5,39,80,1)']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          enableOnAndroid={true}
          extraScrollHeight={30}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView style={styles.container}>
            {/* Botão de Voltar */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Feather name="arrow-left" size={26} color="#fff" />
            </TouchableOpacity>

            {/* Ícone de perfil sobreposto */}
            <View style={styles.iconWrapper}>
              <FontAwesome5 name="user-circle" size={80} color="#005086" style={styles.profileIcon} />
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Text style={styles.title}>CADASTRO</Text>

              {/* Dropdown */}
              <View style={styles.dropdownContainer}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder="Selecione o tipo de usuário"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownBox}
                />
              </View>

              {/* Campo Nome */}
              <View style={styles.inputRow}>
                <Feather name="user" size={24} color="#005086" style={styles.icon} />
                <TextInput
                  placeholder="Digite seu nome completo..."
                  placeholderTextColor="#777"
                  style={styles.input}
                  value={form.nome}
                  onChangeText={(text) => handleChange("nome", text)}
                />
              </View>

              {/* Campo Email */}
              <View style={styles.inputRow}>
                <MaterialIcons name="email" size={24} color="#005086" style={styles.icon} />
                <TextInput
                  placeholder="Digite aqui seu email..."
                  placeholderTextColor="#777"
                  style={styles.input}
                  value={form.email}
                  onChangeText={(text) => handleChange("email", text)}
                />
              </View>

              {/* Campo RA (Aluno) */}
              {value === 'aluno' && (
                <View style={styles.inputRow}>
                  <FontAwesome5 name="chalkboard-teacher" size={24} color="#005086" style={styles.icon} />
                  <TextInput
                    placeholder="Insira seu RA..."
                    placeholderTextColor="#777"
                    style={styles.input}
                    value={form.ra}
                    onChangeText={(text) => handleChange("ra", text)}
                  />
                </View>
              )}

              {/* Campo CNH (Motorista) */}
              {value === 'motorista' && (
                <View style={styles.inputRow}>
                  <FontAwesome5 name="id-badge" size={24} color="#005086" style={styles.icon} />
                  <TextInput
                    placeholder="Insira sua CNH..."
                    placeholderTextColor="#777"
                    style={styles.input}
                    value={form.cnh}
                    onChangeText={(text) => handleChange("cnh", text)}
                  />
                </View>
              )}

              {/* Campo Senha */}
              <View style={styles.inputRow}>
                <Entypo name="lock" size={24} color="#005086" style={styles.icon} />
                <TextInput
                  placeholder="Insira sua senha..."
                  placeholderTextColor="#777"
                  secureTextEntry
                  style={styles.input}
                  value={form.senha}
                  onChangeText={(text) => handleChange("senha", text)}
                />
              </View>

              {/* Botão */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>CADASTRAR</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
  },
  iconWrapper: {
    position: 'absolute',
    top: height * 0.07,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 60,
    padding: 10,
    elevation: 5,
  },
  profileIcon: {
    resizeMode: 'contain',
  },
  card: {
    marginTop: height * 0.12,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    color: '#002c45',
    marginBottom: 24,
    fontFamily: 'LeagueSpartan-Bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 18,
    width: '100%',
    zIndex: 0,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 18,
    zIndex: 10,
  },
  dropdown: {
    backgroundColor: '#eee',
    borderRadius: 14,
    borderWidth: 0,
  },
  dropdownBox: {
    backgroundColor: '#eee',
    borderRadius: 14,
    borderWidth: 0,
    zIndex: 1000, // garante que fique acima dos campos
  },
  button: {
    backgroundColor: '#005086',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
    borderColor: '#00406d',
    borderWidth: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'LeagueSpartan-Bold',
  },
});
