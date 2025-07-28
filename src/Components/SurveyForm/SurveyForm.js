import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useTranslation} from "react-i18next";
import i18n from "i18next";

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
    h1, h2{
        font-family: Oswald, "Noto Serif Hebrew Condensed", sans-serif;
        margin: 3vw 0;
    }
`;

const Form = styled.form`
  background: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #354358;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SubmitButton = styled.button`
  background: #33beb3;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
    margin: 3vw 0;
  &:hover {
    background: #354358;
  }
`;

const TextDescription  = styled.p`
    font-size: 16px;
`

// Новые стили для компонентов множественного выбора
const MultiSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 0.5rem;
  background-color: white;
  cursor: pointer;
`;

const SelectedOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const OptionTag = styled.div`
  display: flex;
  align-items: center;
  background-color: #e0f7fa;
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-size: 0.9rem;
  color: #00796b;
`;

const RemoveButton = styled.button`
  margin-left: 0.3rem;
  background: none;
  border: none;
  color: #00796b;
  font-size: 1.7rem;
  cursor: pointer;
  padding: 0 0.2rem;
  line-height: 1;

  &:hover {
    color: #b71c1c;
  }
`;


const SurveyForm = (props) => {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        mainGoal: '',
        customMainGoal: '',
        targetAudience: '',
        customAudience: '',
        motivation: '',
        uniqueness: '',
        successMetrics: [],
        customSuccessMetric: '',
        keyActions: [],
        customKeyAction: '',
        designMaterials: [],
        customDesignMaterial: '',
        brandColors: '',
        references: '',
        referencesLinks: '',
        stylePreference: '',
        customStylePreference: '',
        customStyle: '',
        contentReady: '',
        hasLogo: '',
        mainPhoneNumber: '',
        sections: [],
        customSection: '',
        needsForms: '',
        contactMethod: [],
        customContactMethod: '',
        needsAnimation: '',
        multilingual: '',
        importantDevices: [],
        customDevice: '',
        hosting: '',
        competitorLinks: '',
        competitorMistakes: '',
        usp: '',
        deadline: '',
        budget: '',
        customBudget: '',
        needsSupport: '',
        additionalNotes: '',
        selectedOptions: []
    });

    // Вспомогательная функция для получения читаемых названий опций
            const getOptionLabel = (value) => {
                const options = {
        };
        return options[value] || value;
    };
    // Функция для обработки выбора вариантов
    const handleMultiSelect = (e, formData, setFormData, fieldName, maxSelections) => {
        const { value } = e.target;

        // Проверяем, существует ли уже такой вариант в выбранных
        const isSelected = formData[fieldName].includes(value);

        // Если вариант уже выбран - ничего не делаем
        if (isSelected) return;

        // Проверяем максимальное количество выборов
        if (maxSelections && formData[fieldName].length >= maxSelections) {
            alert(`Можно выбрать не более ${maxSelections} вариантов`);
            return;
        }

        // Обновляем состояние формы
        setFormData(prev => ({
            ...prev,
            [fieldName]: [...prev[fieldName], value]
        }));

        // Сбрасываем значение select, чтобы можно было выбрать снова
        e.target.value = '';
    };

    // Функция для удаления выбранного варианта
    const removeOption = (fieldName, valueToRemove) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: prev[fieldName].filter(value => value !== valueToRemove)
        }));
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (checked) {
                setFormData(prev => ({
                    ...prev,
                    [name]: [...prev[name], value]
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: prev[name].filter(item => item !== value)
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Здесь можно добавить логику отправки данных
    };

    const changeSelectedOptions = (fieldName) => {
        return formData[fieldName].map(item => (
            <OptionTag key={item}>
                {getOptionLabel(item, fieldName)}
                <RemoveButton onClick={() => removeOption(fieldName, item)}>×</RemoveButton>
            </OptionTag>
        ))
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <h1>{t('survey.title')}</h1>
                <p>{t('survey.text_1')}</p>

                <Section>
                    <h2>1. {t('survey.section_1.title')}</h2>

                    <FormGroup>
                        <Label>1.1 {t('survey.section_1.question_1.1.question')}</Label>
                        <Select
                            name="mainGoal"
                            value={formData.mainGoal}
                            onChange={handleChange}
                            required
                        >
                            <option value="">{t('survey.select_option')}</option>
                            <option value="sales">{t('survey.section_1.question_1.1.answer_1.1')}</option>
                            <option value="leads">{t('survey.section_1.question_1.1.answer_1.2')}</option>
                            <option value="portfolio">{t('survey.section_1.question_1.1.answer_1.3')}</option>
                            <option value="presentation">{t('survey.section_1.question_1.1.answer_1.4')}</option>
                            <option value="information">{t('survey.section_1.question_1.1.answer_1.5')}</option>
                            <option value="business-card">{t('survey.section_1.question_1.1.answer_1.6')}</option>
                            <option value="event">{t('survey.section_1.question_1.1.answer_1.7')}</option>
                            <option value="subscribers">{t('survey.section_1.question_1.1.answer_1.8')}</option>
                            <option value="testing">{t('survey.section_1.question_1.1.answer_1.9')}</option>
                            <option value="branding">{t('survey.section_1.question_1.1.answer_1.10')}</option>
                            <option value="launch">{t('survey.section_1.question_1.1.answer_1.11')}</option>
                            <option value="community">{t('survey.section_1.question_1.1.answer_1.12')}</option>
                            <option value="app">{t('survey.section_1.question_1.1.answer_1.13')}</option>
                            <option value="recruitment">{t('survey.section_1.question_1.1.answer_1.14')}</option>
                            <option value="other">{t('survey.other')}</option>
                        </Select>
                        {formData.mainGoal === 'other' && (
                            <Input
                                type="text"
                                name="customMainGoal"
                                value={formData.customMainGoal}
                                onChange={handleChange}
                                placeholder={t('survey.section_1.question_1.1.placeholder')}
                                required
                            />
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>{t('survey.section_1.question_1.2.question')}</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="youth"
                                    checked={formData.targetAudience === 'youth'}
                                    onChange={handleChange}
                                    required
                                />
                                {t('survey.section_1.question_1.2.answer_1')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="adults"
                                    checked={formData.targetAudience === 'adults'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_1.question_1.2.answer_2')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="seniors"
                                    checked={formData.targetAudience === 'seniors'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_1.question_1.2.answer_3')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="custom"
                                    checked={formData.targetAudience === 'custom'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_1.question_1.2.answer_4')}
                                {formData.targetAudience === 'custom' && (
                                    <Input
                                        type="text"
                                        name="customAudience"
                                        value={formData.customAudience}
                                        onChange={handleChange}
                                        placeholder={t('survey.section_1.question_1.2.placeholder')}
                                        required
                                    />
                                )}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>

                    <FormGroup>
                        <Label>1.3 {t('survey.section_1.question_1.3.question')}</Label>
                        <TextArea
                            name="motivation"
                            value={formData.motivation}
                            onChange={handleChange}
                            placeholder={t('survey.section_1.question_1.3.placeholder')}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>1.4 {t('survey.section_1.question_1.4.question')}</Label>
                        <TextArea
                            name="uniqueness"
                            value={formData.uniqueness}
                            onChange={handleChange}
                            placeholder={t('survey.section_1.question_1.4.placeholder')}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>1.5 {t('survey.section_1.question_1.5.question')}</Label>
                        <TextDescription>{t('survey.section_1.question_1.5.description')}</TextDescription>
                        <MultiSelect
                            name="successMetrics"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, "successMetrics", 5)}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">{t('survey.select_option')}</option>
                            <option value="Количество заявок или обращений">{t('survey.section_1.question_1.5.answer_1')}</option>
                            <option value="Количество покупок или заказов">{t('survey.section_1.question_1.5.answer_2')}</option>
                            <option value="Подписки или регистрации">{t('survey.section_1.question_1.5.answer_3')}</option>
                            <option value="Конверсия (отношение посетителей к целевым действиям)">{t('survey.section_1.question_1.5.answer_4')}</option>
                            <option value="Время, проведённое на сайте">{t('survey.section_1.question_1.5.answer_5')}</option>
                            <option value="Показатель отказов (Bounce Rate)">{t('survey.section_1.question_1.5.answer_6')}</option>
                            <option value="other">{t('survey.other')}</option>
                        </MultiSelect>
                        <SelectedOptions>
                            {changeSelectedOptions('successMetrics')}
                        </SelectedOptions>
                    </FormGroup>

                    <FormGroup>
                        <Label>1.6 {t('survey.section_1.question_1.6.question')}</Label>
                        <MultiSelect
                            name="keyActions"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, "keyActions")}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">{t('survey.select_more_options')}</option>
                            <option value="Заполнить форму">{t('survey.section_1.question_1.6.answer_1')}</option>
                            <option value="Позвонить">{t('survey.section_1.question_1.6.answer_2')}</option>
                            <option value="Подписаться на рассылку">{t('survey.section_1.question_1.6.answer_3')}</option>
                            <option value="Получить информацию об услуге">{t('survey.section_1.question_1.6.answer_4')}</option>
                            <option value=" Поделиться в соцсетях» через кнопки. ">{t('survey.section_1.question_1.6.answer_5')}</option>
                            <option value="Просмотреть отзывы об услуге">{t('survey.section_1.question_1.6.answer_6')}</option>
                            <option value="Совершить покупку">{t('survey.section_1.question_1.6.answer_7')}</option>
                            <option value="other">{t('survey.other')}</option>
                        </MultiSelect>
                        <SelectedOptions>
                            {changeSelectedOptions('keyActions')}
                        </SelectedOptions>
                    </FormGroup>

                </Section>

                <Section>
                    <h2>2. {t('survey.section_2.title')}</h2>

                    <FormGroup>
                        <Label>2.1 {t('survey.section_2.question_2.1.question')}</Label>
                        <CheckboxGroup>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="brandbook"
                                    checked={formData.designMaterials.includes('brandbook')}
                                    onChange={handleChange}
                                />
                                {t('survey.section_2.question_2.1.answer_1')}
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="identity"
                                    checked={formData.designMaterials.includes('identity')}
                                    onChange={handleChange}
                                />
                                {t('survey.section_2.question_2.1.answer_2')}
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="ready_content"
                                    checked={formData.designMaterials.includes('ready_content')}
                                    onChange={handleChange}
                                />
                                {t('survey.section_2.question_2.1.answer_3')}
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="photo_video"
                                    checked={formData.designMaterials.includes('photo_video')}
                                    onChange={handleChange}
                                />
                                {t('survey.section_2.question_2.1.answer_4')}
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="no_materials"
                                    checked={formData.designMaterials.includes('no_materials')}
                                    onChange={handleChange}
                                />
                                {t('survey.section_2.question_2.1.answer_5')}
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="custom"
                                    checked={formData.designMaterials.includes('custom')}
                                    onChange={handleChange}
                                />
                                {t('survey.other')}
                                {formData.designMaterials.includes('custom') && (
                                    <Input
                                        type="text"
                                        name="customDesignMaterials"
                                        value={formData.customDesignMaterial}
                                        onChange={handleChange}
                                        placeholder= {t('survey.section_2.question_2.1.placeholder')}
                                        required
                                    />
                                )}
                            </CheckboxLabel>
                        </CheckboxGroup>
                    </FormGroup>
                        <FormGroup>
                            <Label>2.2 {t('survey.section_2.question_2.2.question')}</Label>
                            <TextArea
                                name="brandColors"
                                value={formData.brandColors}
                                onChange={handleChange}
                                placeholder={t('survey.section_2.question_2.2.placeholder')}
                                required
                            />
                        </FormGroup>

                    <FormGroup>
                        <Label>2.3 {t('survey.section_2.question_2.3.question')}</Label>
                        <TextArea
                            name="references"
                            value={formData.references}
                            onChange={handleChange}
                            placeholder={t('survey.section_2.question_2.3.placeholder')}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>2.4 {t('survey.section_2.question_2.4.question')}</Label>
                        <CheckboxGroup>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="minimalism"
                                    checked={formData.stylePreference.includes('minimalism')}
                                    onChange={handleChange}
                                />
                                {t('survey.section_2.question_2.4.answer_1')}
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="corporate"
                                    checked={formData.stylePreference.includes('corporate')}
                                    onChange={handleChange}
                                />
                                {t('survey.section_2.question_2.4.answer_2')}
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="futuristic"
                                    checked={formData.stylePreference.includes('futuristic')}
                                    onChange={handleChange}
                                />
                                {t('survey.section_2.question_2.4.answer_3')}
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="retro"
                                    checked={formData.stylePreference.includes('retro')}
                                    onChange={handleChange}
                                />
                                {t('survey.section_2.question_2.4.answer_4')}
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="custom"
                                    checked={formData.stylePreference.includes('custom')}
                                    onChange={handleChange}
                                />
                                {t('survey.other')}
                                {formData.stylePreference.includes('custom') && (
                                    <Input
                                        type="text"
                                        name="customStylePreference"
                                        value={formData.customStylePreference}
                                        onChange={handleChange}
                                        placeholder={t('survey.section_2.question_2.4.placeholder')}
                                        required
                                    />
                                )}
                            </CheckboxLabel>
                        </CheckboxGroup>
                    </FormGroup>
                </Section>
                <Section>
                    <h2>3 {t('survey.section_3.title')}</h2>
                    <FormGroup>
                        <Label>3.1 {t('survey.section_3.question_3.1.question')}</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="yes"
                                    checked={formData.targetAudience === 'yes'}
                                    onChange={handleChange}
                                    required
                                />
                                {t('survey.section_3.question_3.1.answer_1')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="partially"
                                    checked={formData.targetAudience === 'partially'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_3.question_3.1.answer_2')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="no"
                                    checked={formData.targetAudience === 'no'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_3.question_3.1.answer_3')}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>3.2  {t('survey.section_3.question_3.2.question')}</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hasLogo"
                                    value="yes"
                                    checked={formData.hasLogo === 'yes'}
                                    onChange={handleChange}
                                    required
                                />
                                {t('survey.section_3.question_3.2.answer_1')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hasLogo"
                                    value="no"
                                    checked={formData.hasLogo === 'no'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_3.question_3.2.answer_2')}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>3.3 {t('survey.section_3.question_3.3.question')}</Label>
                        <TextArea
                            name="mainPhoneNumber"
                            value={formData.mainPhoneNumber}
                            onChange={handleChange}
                            placeholder={t('survey.section_3.question_3.3.placeholder')}
                        />
                    </FormGroup>

                </Section>

                <Section>
                    <h2>4 {t('survey.section_4.title')}</h2>
                    <FormGroup>
                        <Label>4.1 {t('survey.section_4.question_4.1.question')}</Label>
                        <MultiSelect
                            name="sections"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, 'sections', 5)}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">{t('survey.select_option')}</option>
                            <option value="about">{t('survey.section_4.question_4.1.answer_1')}</option>
                            <option value="services">{t('survey.section_4.question_4.1.answer_2')}</option>
                            <option value="portfolio">{t('survey.section_4.question_4.1.answer_3')}</option>
                            <option value="advantages">{t('survey.section_4.question_4.1.answer_4')}</option>
                            <option value="contacts">{t('survey.section_4.question_4.1.answer_5')}</option>
                            <option value="reviews">{t('survey.section_4.question_4.1.answer_6')}</option>
                            <option value="other">{t('survey.other')}</option>
                        </MultiSelect>

                        {/* Отображение выбранных вариантов */}
                        <SelectedOptions>
                            {changeSelectedOptions('sections')}
                        </SelectedOptions>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.2 {t('survey.section_4.question_4.2.question')}</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsForms"
                                    value="yes"
                                    checked={formData.needsForms === 'yes'}
                                    onChange={handleChange}
                                    required
                                />
                                {t('survey.section_4.question_4.2.answer_1')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsForms"
                                    value="no"
                                    checked={formData.needsForms === 'no'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_4.question_4.2.answer_2')}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.3 {t('survey.section_4.question_4.3.question')}</Label>
                        <MultiSelect
                            name="contactMethod"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, 'contactMethod', 5)}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">{t('survey.select_option')}</option>
                            <option value="Через форму, которая отсылает данные пользователя на email">
                                {t('survey.section_4.question_4.3.answer_1')}</option>
                            <option value="Через кнопку, которая переводит его в чат в WhatsApp">
                                {t('survey.section_4.question_4.3.answer_2')}</option>
                            <option value="Просто через указанные контакты на старнице сайта">
                                {t('survey.section_4.question_4.3.answer_3')}</option>
                            <option value=" Через иконки, которые переводят пользователя на страницы ваших  соц. Сетей.">
                                {t('survey.section_4.question_4.3.answer_4')}</option>
                            <option value="Все варианты"> {t('survey.section_4.question_4.3.answer_5')}</option>
                        </MultiSelect>
                        <SelectedOptions>
                            {changeSelectedOptions('contactMethod')}
                        </SelectedOptions>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.4 {t('survey.section_4.question_4.4.question')}</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsAnimation"
                                    value="yes"
                                    checked={formData.needsAnimation === 'yes'}
                                    onChange={handleChange}
                                    required
                                />
                                {t('survey.section_4.question_4.4.answer_1')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsAnimation"
                                    value="no"
                                    checked={formData.needsAnimation === 'no'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_4.question_4.4.answer_2')}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.5  {t('survey.section_4.question_4.5.question')}</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="multilingual"
                                    value="yes"
                                    checked={formData.multilingual === 'yes'}
                                    onChange={handleChange}
                                    required
                                />
                                {t('survey.section_4.question_4.5.answer_1')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="multilingual"
                                    value="no"
                                    checked={formData.multilingual === 'no'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_4.question_4.5.answer_2')}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                </Section>

                <Section>
                    <h2>5  {t('survey.section_5.title')}</h2>
                    <FormGroup>
                        <Label>5.1 {t('survey.section_5.question_5.1.question')}</Label>
                        <MultiSelect
                            name="importantDevices"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, 'importantDevices', 2)}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">{t('survey.select_option')}</option>
                            <option value="Мобильные ">{t('survey.section_5.question_5.1.answer_1')}</option>
                            <option value="Планшеты">{t('survey.section_5.question_5.1.answer_2')}</option>
                            <option value="ПК">{t('survey.section_5.question_5.1.answer_3')}</option>
                        </MultiSelect>

                        {/* Отображение выбранных вариантов */}
                        <SelectedOptions>
                            {changeSelectedOptions('importantDevices')}
                        </SelectedOptions>
                    </FormGroup>
                    <FormGroup>
                        <Label>5.2 {t('survey.section_5.question_5.2.question')}</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hosting"
                                    value="already_have_hosting"
                                    checked={formData.hosting === 'already_have_hosting'}
                                    onChange={handleChange}
                                    required
                                />
                                {t('survey.section_5.question_5.2.answer_1')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hosting"
                                    value="no"
                                    checked={formData.hosting === 'no'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_5.question_5.2.answer_2')}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                </Section>
                <Section>
                    <h2>6 {t('survey.section_6.title')}</h2>
                    <FormGroup>
                    <Label>6.1 {t('survey.section_6.question_6.1.question')}</Label>
                    <TextArea
                        name="competitorLinks"
                        value={formData.competitorLinks}
                        onChange={handleChange}
                        placeholder={t('survey.section_6.question_6.1.placeholder')}
                    />
                </FormGroup>
                    <FormGroup>
                        <Label>6.2 {t('survey.section_6.question_6.2.question')}</Label>
                        <TextArea
                            name="competitorMistakes"
                            value={formData.competitorMistakes}
                            onChange={handleChange}
                            placeholder={t('survey.section_6.question_6.2.placeholder')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>6.3 {t('survey.section_6.question_6.3.question')}</Label>
                        <TextArea
                            name="usp"
                            value={formData.usp}
                            onChange={handleChange}
                            placeholder={t('survey.section_6.question_6.3.placeholder')}
                        />
                    </FormGroup>
                </Section>
                <Section>
                    <h2>7 {t('survey.section_7.title')}</h2>
                    <FormGroup>
                        <Label>7.1 {t('survey.section_7.question_7.1.question')}</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="deadline"
                                    value="urgently"
                                    checked={formData.deadline === 'urgently'}
                                    onChange={handleChange}
                                    required
                                />
                                {t('survey.section_7.question_7.1.answer_1')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="deadline"
                                    value="one_month"
                                    checked={formData.deadline === 'one_month'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_7.question_7.1.answer_2')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="deadline"
                                    value="not_hurry"
                                    checked={formData.deadline === 'not_hurry'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_7.question_7.1.answer_3')}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>7.2 {t('survey.section_7.question_7.2.question')}</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="budget"
                                    value="no"
                                    checked={formData.budget === 'no'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_7.question_7.2.answer_1')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="budget"
                                    value="yes"
                                    checked={formData.budget === 'yes'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_7.question_7.2.answer_2')}
                                {formData.budget.includes('yes') && (
                                    <Input
                                        type="text"
                                        name="customBudget"
                                        value={formData.customBudget}
                                        onChange={handleChange}
                                        placeholder="Укажите бюджет"
                                        required
                                    />
                                )}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>7.3 {t('survey.section_7.question_7.3.question')}</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsSupport"
                                    value="no"
                                    checked={formData.needsSupport === 'no'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_7.question_7.3.answer_1')}
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsSupport"
                                    value="yes"
                                    checked={formData.needsSupport === 'yes'}
                                    onChange={handleChange}
                                />
                                {t('survey.section_7.question_7.3.answer_2')}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                </Section>

                <p>{t('survey.text_2')}</p>
                <FormGroup>
                    <TextArea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        placeholder={t('survey.placeholder')}
                    />
                </FormGroup>

                <SubmitButton type="submit">{t('survey.button')}</SubmitButton>
            </Form>
        </FormContainer>
    );
};
export default SurveyForm;