import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import './MultiStepModal.css';

import iconActivity from '../../assets/rota.png';
import iconBudget from '../../assets/dolar.png';
import iconDistance from '../../assets/lado-do-carro.png';
import iconPreferences from '../../assets/controles-deslizantes-de-configuracoes.png';
import iconCheck from '../../assets/verificar.png';

interface MultiStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: UserPreferences) => void;
}

export interface UserPreferences {
  activity: string;
  budget: string;
  distance: string;
  preferences: string[];
}

const STORAGE_KEY = 'rol-aju-user-preferences';

// Função para salvar preferências no localStorage
export const saveUserPreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Erro ao salvar preferências:', error);
  }
};

// Função para carregar preferências do localStorage
export const loadUserPreferences = (): UserPreferences | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Erro ao carregar preferências:', error);
  }
  return null;
};

// Função para limpar preferências
export const clearUserPreferences = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar preferências:', error);
  }
};

export function MultiStepModal({ isOpen, onClose, onComplete }: MultiStepModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UserPreferences>({
    activity: '',
    budget: '',
    distance: '',
    preferences: []
  });

  // Carrega preferências salvas quando o modal abre
  useEffect(() => {
    if (isOpen) {
      const savedPreferences = loadUserPreferences();
      if (savedPreferences) {
        setFormData(savedPreferences);
      }
    }
  }, [isOpen]);

  const activities = [
    { id: 'praia', label: 'Ir à Praia' },
    { id: 'restaurante', label: 'Comer' },
    { id: 'passeio', label: 'Passear' },
    { id: 'cultura', label: 'Cultura' },
    { id: 'diversao', label: 'Diversão' }
  ];

  const budgets = [
    { id: '50', label: 'Até R$ 50' },
    { id: '100', label: 'Até R$ 100' },
    { id: '200', label: 'Até R$ 200' },
    { id: '300', label: 'Até R$ 300' },
    { id: '300+', label: 'Acima de R$ 300' }
  ];

  const distances = [
    { id: '<1', label: 'Menos de 1 quilometros' },
    { id: '1-5', label: 'Entre 1 e 5 quilometros' },
    { id: '5+', label: 'Mais de 5 quilometros' }
  ];

  const preferenceOptions = [
    { id: 'pet-friendly', label: 'Pet Friendly' },
    { id: 'calmo', label: 'Ambiente Calmo' },
    { id: 'climatizado', label: 'Climatizado' },
    { id: 'ar-livre', label: 'Ao Ar Livre' },
    { id: 'familiar', label: 'Familiar' },
    { id: 'acessivel', label: 'Acessível' }
  ];

  const handleActivitySelect = (activity: string) => {
    setFormData({ ...formData, activity });
  };

  const handleBudgetSelect = (budget: string) => {
    setFormData({ ...formData, budget });
  };

  const handleDistanceSelect = (distance: string) => {
    setFormData({ ...formData, distance });
  };

  const togglePreference = (preference: string) => {
    const newPreferences = formData.preferences.includes(preference)
      ? formData.preferences.filter(p => p !== preference)
      : [...formData.preferences, preference];
    setFormData({ ...formData, preferences: newPreferences });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    // Salva as preferências
    saveUserPreferences(formData);
    
    // Chama o callback com os dados
    onComplete(formData);
    
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      activity: '',
      budget: '',
      distance: '',
      preferences: []
    });
    onClose();
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canAdvance = () => {
    switch(currentStep) {
      case 1: return formData.activity !== '';
      case 2: return formData.budget !== '';
      case 3: return formData.distance !== '';
      case 4: return true; // Preferências são opcionais
      default: return false;
    }
  };

  const getStepIcon = (step: number) => {
    // Se o passo está completo, retorna o check
    if (step < currentStep) {
      return iconCheck;
    }
    
    // Retorna o ícone específico de cada passo
    switch(step) {
      case 1: return iconActivity;
      case 2: return iconBudget;
      case 3: return iconDistance;
      case 4: return iconPreferences;
      default: return iconActivity;
    }
  };

  const getStepLabel = (step: number) => {
    switch(step) {
      case 1: return 'O que você quer fazer agora ?';
      case 2: return 'Quanto você pretende gastar ?';
      case 3: return 'Qual a distância máxima ?';
      case 4: return 'Preferências';
      default: return '';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="multi-step-modal">
        {/* Left Side - Steps Progress */}
        <div className="steps-sidebar">
          <h2 className="modal-title">Qual experiência você deseja ter hoje?</h2>
          
          <div className="steps-list">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="step-item-wrapper">
                <div className={`step-item ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
                  <div className="step-icon">
                    <img src={getStepIcon(step)} alt="" className="step-icon-img" />
                  </div>
                  <span className="step-label">{getStepLabel(step)}</span>
                </div>
                {step < 4 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Step Content */}
        <div className="step-content-area">
          <h3 className="step-title">
            {currentStep === 1 && 'Escolha a atividade de sua preferência:'}
            {currentStep === 2 && 'Escolha seu orçamento:'}
            {currentStep === 3 && 'Escolha a distância de sua preferência:'}
            {currentStep === 4 && 'Escolha suas preferências:'}
          </h3>

          {/* Step 1: Activity */}
          {currentStep === 1 && (
            <>
              <div className="options-container">
                {activities.map((activity) => (
                  <label key={activity.id} className="radio-option">
                    <input
                      type="radio"
                      name="activity"
                      value={activity.id}
                      checked={formData.activity === activity.id}
                      onChange={() => handleActivitySelect(activity.id)}
                    />
                    <span className="radio-label">{activity.label}</span>
                  </label>
                ))}
              </div>
              <div className="step-actions">
                <div></div>
                <button 
                  className="btn-advance" 
                  onClick={handleNext}
                  disabled={!canAdvance()}
                >
                  Avançar
                </button>
              </div>
            </>
          )}

          {/* Step 2: Budget */}
          {currentStep === 2 && (
            <>
              <div className="options-container">
                {budgets.map((budget) => (
                  <label key={budget.id} className="radio-option">
                    <input
                      type="radio"
                      name="budget"
                      value={budget.id}
                      checked={formData.budget === budget.id}
                      onChange={() => handleBudgetSelect(budget.id)}
                    />
                    <span className="radio-label">{budget.label}</span>
                  </label>
                ))}
              </div>
              <div className="step-actions">
                <button className="btn-back-circle" onClick={handleBack}>
                  ←
                </button>
                <button 
                  className="btn-advance" 
                  onClick={handleNext}
                  disabled={!canAdvance()}
                >
                  Avançar
                </button>
              </div>
            </>
          )}

          {/* Step 3: Distance */}
          {currentStep === 3 && (
            <>
              <div className="options-container">
                {distances.map((distance) => (
                  <label key={distance.id} className="radio-option">
                    <input
                      type="radio"
                      name="distance"
                      value={distance.id}
                      checked={formData.distance === distance.id}
                      onChange={() => handleDistanceSelect(distance.id)}
                    />
                    <span className="radio-label">{distance.label}</span>
                  </label>
                ))}
              </div>
              <div className="step-actions">
                <button className="btn-back-circle" onClick={handleBack}>
                  ←
                </button>
                <button 
                  className="btn-advance" 
                  onClick={handleNext}
                  disabled={!canAdvance()}
                >
                  Avançar
                </button>
              </div>
            </>
          )}

          {/* Step 4: Preferences */}
          {currentStep === 4 && (
            <>
              <div className="options-container">
                {preferenceOptions.map((pref) => (
                  <label key={pref.id} className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.preferences.includes(pref.id)}
                      onChange={() => togglePreference(pref.id)}
                    />
                    <span className="checkbox-label">{pref.label}</span>
                  </label>
                ))}
              </div>
              <div className="step-actions">
                <button className="btn-back-circle" onClick={handleBack}>
                  ←
                </button>
                <button className="btn-advance" onClick={handleComplete}>
                  Finalizar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}