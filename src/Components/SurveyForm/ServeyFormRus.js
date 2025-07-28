import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import * as emailjs from "@emailjs/browser";
import ModalWindow from "../../Utils/ModalWindow";
import ScrollDownButton from "../../Utils/ScrollDownButton";

const FormContainer = styled.div`
    display: ${({isClose}) => isClose ? 'none' : 'block'}; 
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
    position: relative;
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
  color: #33beb3;
`;

const RemoveButton = styled.button`
  margin-left: 0.3rem;
  background: none;
  border: none;
  color: #33beb3;
  font-size: 1.7rem;
  cursor: pointer;
  padding: 0 0.2rem;
  line-height: 1;

  &:hover {
    color: #b71c1c;
  }
`;
const Return = styled.a`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: rotate(90deg);
        opacity: 0.8;
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 15px;
        height: 24px;
        width: 2px;
        background-color: #33beb3;
    }

    &::before {
        transform: rotate(45deg);
    }

    &::after {
        transform: rotate(-45deg);
    }

    &:focus {
        outline: none;
    }
`
const SurveyFormRus = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const form = useRef();
    const [isClose, setIsClose] = useState(false);
    const [formData, setFormData] = useState({
        name_client: '',
        phone_client: '',
        mail_client: '',
        what_business: '',
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
        const options = {};
        return options[value] || value;
    };
    // Функция для обработки выбора вариантов
    const handleMultiSelect = (e, formData, setFormData, fieldName, maxSelections) => {
        const {value} = e.currentTarget;

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
        // e.target.value = '';
    };

    // Функция для удаления выбранного варианта
    const removeOption = (fieldName, valueToRemove) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: prev[fieldName].filter(value => value !== valueToRemove)
        }));
    };


    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;

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
const handeReset = () => {
    setFormData({
        name_client: '',
        phone_client: '',
        mail_client: '',
        what_business: '',
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
}
    const handleSubmit = (e) => {
        e.preventDefault();

        // Подготовка данных для отправки
        const templateParams = {
            name_client: formData.name_client,
            phone_client: formData.phone_client,
            mail_client: formData.mail_client,
            what_business: formData.what_business,
            mainGoal: formData.mainGoal,
            customMainGoal: formData.customMainGoal,
            targetAudience: formData.targetAudience,
            customAudience: formData.customAudience,
            motivation: formData.motivation,
            uniqueness: formData.uniqueness,
            successMetrics: formData.successMetrics.join('\n✓    '), // Преобразуем массив в строку
            customSuccessMetric: formData.customSuccessMetric,
            keyActions: formData.keyActions.join('\n✓    '),
            customKeyAction: formData.customKeyAction,
            designMaterials: formData.designMaterials.join('\n✓    '),
            customDesignMaterial: formData.customDesignMaterial,
            brandColors: formData.brandColors,
            references: formData.references,
            referencesLinks: formData.referencesLinks,
            stylePreference: formData.stylePreference.join('\n✓    '),
            customStylePreference: formData.customStylePreference,
            contentReady: formData.contentReady,
            hasLogo: formData.hasLogo,
            mainPhoneNumber: formData.mainPhoneNumber,
            sections: formData.sections.join('\n✓    '),
            customSection: formData.customSection,
            needsForms: formData.needsForms,
            contactMethod: formData.contactMethod.join('\n✓    '),
            customContactMethod: formData.customContactMethod,
            needsAnimation: formData.needsAnimation,
            multilingual: formData.multilingual,
            importantDevices: formData.importantDevices.join('\n✓    '),
            hosting: formData.hosting,
            competitorLinks: formData.competitorLinks,
            competitorMistakes: formData.competitorMistakes,
            usp: formData.usp,
            deadline: formData.deadline,
            budget: formData.budget,
            customBudget: formData.customBudget,
            needsSupport: formData.needsSupport,
            additionalNotes: formData.additionalNotes
        };

        console.log('Отправляемые данные:', templateParams);

        emailjs.send(
            'service_h1vphxh',  // ID сервиса
            'template_vkwmzo2', // ID шаблона
            templateParams,     // Данные для подстановки
            'jhCEXKdgNdbbtEUOy' // Public Key
        )
            .then(() => {
                handeReset();
                setIsModalOpen(true);
                console.log('Письмо успешно отправлено!');
                setIsClose(true);
            })
            .catch(error => {
                console.error('Ошибка отправки:', error);
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
            });
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
        <FormContainer isOpen={isClose}>
            <ScrollDownButton/>
            <ModalWindow isModalOpen={isModalOpen}/>
            <Form ref={form} onSubmit={handleSubmit}>
                <Return href="/"></Return>
                <h1>ОПРОС ДЛЯ РАЗРАБОТКИ ОДНОСТРАНИЧНОГО САЙТА</h1>
                <p>Пожалуйста, заполните форму, чтобы мы могли создать сайт, соответствующий вашим ожиданиям.</p>
                <FormGroup>
                    <Label>Нaпишите свое имя или название компании</Label>
                    <Input
                        name="name_client"
                        value={formData.name_client}
                        onChange={handleChange}
                        placeholder="Введите имя"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Укажите телефон для связи</Label>
                    <Input
                        type="tel"
                        name="phone_client"
                        value={formData.phone_client}
                        onChange={handleChange}
                        placeholder="Введите номер телефона"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Укажите адрес электронной почты</Label>
                    <Input
                        type="email"
                        name="mail_client"
                        value={formData.mail_client}
                        onChange={handleChange}
                        placeholder="Введите адрес электронной почты"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Опишите чем вы занимаетесь(чем ваш бизнес занимается)?</Label>
                    <Input
                        type="text"
                        name="what_business"
                        value={formData.what_business}
                        onChange={handleChange}
                        placeholder="Опишите,направление бизнеса, его задачи,  в какой стране (городе),
                        если есть ссылки на упоминание вашей компании в интернете или в соц.сетях..."
                        required
                    />
                </FormGroup>
                <Section>
                    <h2>1. Основная информация</h2>

                    <FormGroup>
                        <Label>1.1 Какова главная цель сайта? *</Label>
                        <Select
                            name="mainGoal"
                            value={formData.mainGoal}
                            onChange={handleChange}
                        >
                            <option value="">-- Выберите вариант --</option>
                            <option value="Продажи">Продажи</option>
                            <option value="Привлечение клиентов">Привлечение клиентов</option>
                            <option value="Портфолио">Портфолио</option>
                            <option value="Презентация продукта">Презентация продукта</option>
                            <option value="Информационный сайт">Информационный сайт</option>
                            <option value="Визитка компании">Визитка компании</option>
                            <option value="Регистрация на мероприятие">Регистрация на мероприятие</option>
                            <option value="Сбор подписчиков">Сбор подписчиков</option>
                            <option value="Тестирование гипотезы">Тестирование гипотезы</option>
                            <option value="Брендинг">Брендинг</option>
                            <option value="Запуск нового продукта или услуги">Запуск нового продукта или услуги</option>
                            <option value="Сообщество или форум">Сообщество или форум</option>
                            <option value="Продвижение мобильного приложения">Продвижение мобильного приложения</option>
                            <option value="Рекрутинговая платформа">Рекрутинговая платформа</option>
                            <option value="Другое">Другое</option>
                        </Select>
                        {formData.mainGoal === "Другое" && (
                            <Input
                                type="text"
                                name="customMainGoal"
                                value={formData.customMainGoal}
                                onChange={handleChange}
                                placeholder="Укажите вашу цель"
                                required
                            />
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>1.2 Кто ваша целевая аудитория?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="Молодёжь (18-25 лет)"
                                    checked={formData.targetAudience === "Молодёжь (18-25 лет)"}
                                    onChange={handleChange}
                                    required
                                />
                                Молодёжь (18-25 лет)
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="Взрослые (26-45 лет)"
                                    checked={formData.targetAudience === "Взрослые (26-45 лет)"}
                                    onChange={handleChange}
                                />
                                Взрослые (26-45 лет)
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="Пожилые (56+ лет)"
                                    checked={formData.targetAudience === "Пожилые (56+ лет)"}
                                    onChange={handleChange}
                                />
                                Пожилые (56+ лет)
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="custom"
                                    checked={formData.targetAudience === "custom"}
                                    onChange={handleChange}
                                />
                                Специализированная аудитория:
                                {formData.targetAudience === 'custom' && (
                                    <Input
                                        type="text"
                                        name="customAudience"
                                        value={formData.customAudience}
                                        onChange={handleChange}
                                        placeholder="Укажите вашу аудиторию"
                                        required
                                    />
                                )}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>

                    <FormGroup>
                        <Label>1.3 Какова мотивация людей, которые будут заходить на этот сайт?</Label>
                        <TextArea
                            name="motivation"
                            value={formData.motivation}
                            onChange={handleChange}
                            placeholder="Каким образом сайт решит их проблемы?"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>1.4 В чём исключительность вашего бизнеса?</Label>
                        <TextArea
                            name="uniqueness"
                            value={formData.uniqueness}
                            onChange={handleChange}
                            placeholder="Опишите уникальные особенности вашего бизнеса"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>1.5 Как вы оцениваете успешность посещения сайта?</Label>
                        <TextDescription>Выберите один или несколько вариантов, которые, по вашему мнению,
                            лучше всего отражают эффективность работы сайта:</TextDescription>
                        <MultiSelect
                            name="successMetrics"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, "successMetrics")}
                            value=""// Очищаем значение после выбора
                        >
                            <option value="">Выберите один или несколько вариантов</option>
                            <option value="Количество заявок или обращений">Количество заявок или обращений</option>
                            <option value="Количество покупок или заказов">Количество покупок или заказов</option>
                            <option value="Подписки или регистрации">Подписки или регистрации</option>
                            <option value="Конверсия (отношение посетителей к целевым действиям)">Конверсия (отношение
                                посетителей к целевым действиям)
                            </option>
                            <option value="Время, проведённое на сайте">Время, проведённое на сайте</option>
                            <option value="Показатель отказов (Bounce Rate)">Показатель отказов (Bounce Rate)</option>
                            <option value="Другое">Другое</option>
                        </MultiSelect>
                        {formData.successMetrics === "Другое" && (
                            <Input
                                type="text"
                                name="customSuccessMetric"
                                value={formData.customSuccessMetric}
                                onChange={handleChange}
                                placeholder="Опишите "
                                required
                            />
                        )}
                        <SelectedOptions>
                            {changeSelectedOptions('successMetrics')}
                        </SelectedOptions>
                    </FormGroup>

                    <FormGroup>
                        <Label>1.6 Какие ключевые действия должен совершить пользователь на сайте?</Label>
                        <MultiSelect
                            name="keyActions"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, "keyActions")}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">Выберите один или несколько вариантов</option>
                            <option value="Заполнить форму">Заполнить форму</option>
                            <option value="Позвонить">Позвонить</option>
                            <option value="Подписаться на рассылку">Подписаться на рассылку</option>
                            <option value="Получить информацию об услуге">Получить информацию об услуге</option>
                            <option value=" Поделиться в соцсетях» через кнопки. ">Поделиться в соцсетях» через
                                кнопки.
                            </option>
                            <option value="Просмотреть отзывы об услуге">Просмотреть отзывы об услуге</option>
                            <option value="Совершить покупку">Совершить покупку</option>
                            <option value="Другое">Другое</option>
                        </MultiSelect>
                        <SelectedOptions>
                            {changeSelectedOptions('keyActions')}
                        </SelectedOptions>
                        {formData.keyActions === "Другое" && (
                            <Input
                                type="text"
                                name="customKeyAction"
                                value={formData.customKeyAction}
                                onChange={handleChange}
                                placeholder="Опишите "
                                required
                            />
                        )}
                    </FormGroup>

                </Section>

                <Section>
                    <h2>2. Стиль и визуальные предпочтения</h2>

                    <FormGroup>
                        <Label>2.1 Какие у вас есть материалы по части дизайна? (Выберите все подходящие)</Label>
                        <CheckboxGroup>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="Готовый брендбук"
                                    checked={formData.designMaterials.includes("Готовый брендбук")}
                                    onChange={handleChange}
                                />
                                Готовый брендбук
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="Фирменная айдентика"
                                    checked={formData.designMaterials.includes("Фирменная айдентика")}
                                    onChange={handleChange}
                                />
                                Фирменная айдентика
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value=" Готовый контент"
                                    checked={formData.designMaterials.includes(" Готовый контент")}
                                    onChange={handleChange}
                                />
                                Готовый контент
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value=" Фотографии и видео"
                                    checked={formData.designMaterials.includes(" Фотографии и видео")}
                                    onChange={handleChange}
                                />
                                Фотографии и видео
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value=" Нет никаких материалов"
                                    checked={formData.designMaterials.includes(" Нет никаких материалов")}
                                    onChange={handleChange}
                                />
                                Нет никаких материалов
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value='custom'
                                    checked={formData.designMaterials.includes('custom')}
                                    onChange={handleChange}
                                />
                                Другое (укажите)
                            </CheckboxLabel>
                            {formData.designMaterials.includes('custom') && (
                                <Input
                                    type="text"
                                    name="customDesignMaterial"
                                    value={formData.customDesignMaterial}
                                    onChange={handleChange}
                                    placeholder="Укажите другие материалы"
                                />
                            )}
                        </CheckboxGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>2.2 Какие ваши фирменные цвета?</Label>
                        <TextArea
                            name="brandColors"
                            value={formData.brandColors}
                            onChange={handleChange}
                            placeholder="Укажите предпочтения по цветам для вашего сайта"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>2.3 Укажите референсы (примеры сайтов, которые вам нравятся)?</Label>
                        <TextArea
                            name="references"
                            value={formData.references}
                            onChange={handleChange}
                            placeholder="Укажите ссылки"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>2.4 Какой стиль вам ближе?</Label>
                        <CheckboxGroup>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value=" Минимализм"
                                    checked={formData.stylePreference.includes(" Минимализм")}
                                    onChange={handleChange}
                                />
                                Минимализм
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value=" Корпоративный"
                                    checked={formData.stylePreference.includes(" Корпоративный")}
                                    onChange={handleChange}
                                />
                                Корпоративный
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="  Футуристический"
                                    checked={formData.stylePreference.includes("  Футуристический")}
                                    onChange={handleChange}
                                />
                                Футуристический
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="  Ретро"
                                    checked={formData.stylePreference.includes("  Ретро")}
                                    onChange={handleChange}
                                />
                                Ретро
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="Другое"
                                    checked={formData.stylePreference.includes("Другое")}
                                    onChange={handleChange}
                                />
                                Другое
                                {formData.stylePreference.includes("Другое") && (
                                    <Input
                                        type="text"
                                        name="customStylePreference"
                                        value={formData.customStylePreference}
                                        onChange={handleChange}
                                        placeholder="Укажите другие стили"
                                        required
                                    />
                                )}
                            </CheckboxLabel>
                        </CheckboxGroup>
                    </FormGroup>
                </Section>
                <Section>
                    <h2>3 Контент</h2>
                    <FormGroup>
                        <Label>3.1 Есть ли у вас готовые тексты, изображения, видео?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="contentReady"
                                    value=" Да, всё готово"
                                    checked={formData.contentReady === " Да, всё готово"}
                                    onChange={handleChange}
                                    required
                                />
                                Да, всё готово
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="contentReady"
                                    value=" Частично"
                                    checked={formData.contentReady === " Частично"}
                                    onChange={handleChange}
                                />
                                Частично
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="contentReady"
                                    value="no"
                                    checked={formData.contentReady === 'no'}
                                    onChange={handleChange}
                                />
                                Нет, нужно создать
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>3.2 Есть ли у вас логотип?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hasLogo"
                                    value="yes"
                                    checked={formData.hasLogo === 'yes'}
                                    onChange={handleChange}
                                />
                                Да
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hasLogo"
                                    value="no"
                                    checked={formData.hasLogo === 'no'}
                                    onChange={handleChange}
                                />
                                Нет, нужно разработать
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>3.3 Какой номер телефона является для вашей компании основным?</Label>
                        <TextArea
                            name="mainPhoneNumber"
                            value={formData.mainPhoneNumber}
                            onChange={handleChange}
                            placeholder="Укажите номер телефона "
                        />
                    </FormGroup>

                </Section>

                <Section>
                    <h2>4 Функциональность</h2>
                    <FormGroup>
                        <Label>4.1 Какие секции должен включать сайт? (Выберите нужные)</Label>
                        <MultiSelect
                            name="sections"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, 'sections', 5)}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">Выберите один или несколько вариантов</option>
                            <option value="О нас">О нас</option>
                            <option value="Услуги">Услуги</option>
                            <option value="Портфолио">Портфолио</option>
                            <option value="Наши преимущества">Наши преимущества</option>
                            <option value="Контакты">Контакты</option>
                            <option value="Отзывы">Отзывы</option>
                            <option value="Другое">Другое</option>
                        </MultiSelect>
                        <SelectedOptions>
                            {changeSelectedOptions('sections')}
                        </SelectedOptions>
                        {formData.sections === "Другое" && (
                            <Input
                                type="text"
                                name="customSection"
                                value={formData.customSection}
                                onChange={handleChange}
                                placeholder="Опишите... "
                                required
                            />
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label>4.2 Нужны ли формы обратной связи или подписки?</Label>
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
                                Да
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsForms"
                                    value="no"
                                    checked={formData.needsForms === 'no'}
                                    onChange={handleChange}
                                />
                                Нет
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.3 Как вы хотите, чтобы пользователь связывался с вами?</Label>
                        <MultiSelect
                            name="contactMethod"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, 'contactMethod', 5)}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">Выберите один или несколько вариантов</option>
                            <option value="Через форму, которая отсылает данные пользователя на email">
                                Через форму, которая отсылает данные пользователя на email
                            </option>
                            <option value="Через кнопку, которая переводит его в чат в WhatsApp">
                                Через кнопку, которая переводит его в чат в WhatsApp
                            </option>
                            <option value="Просто через указанные контакты на старнице сайта">
                                Просто через указанные контакты на старнице сайта
                            </option>
                            <option
                                value=" Через иконки, которые переводят пользователя на страницы ваших  соц. cетей.">
                                Через иконки, которые переводят пользователя на страницы ваших соц. cетей.
                            </option>
                            <option value="Все варианты">Все варианты</option>
                        </MultiSelect>
                        <SelectedOptions>
                            {changeSelectedOptions('contactMethod')}
                        </SelectedOptions>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.4 Требуется ли анимация, интерактивные элементы?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsAnimation"
                                    value="Да"
                                    checked={formData.needsAnimation === "Да"}
                                    onChange={handleChange}
                                    required
                                />
                                Да
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsAnimation"
                                    value="Нет"
                                    checked={formData.needsAnimation === "Нет"}
                                    onChange={handleChange}
                                />
                                Нет
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.5 Планируется ли мультиязычность?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="multilingual"
                                    value="Да"
                                    checked={formData.multilingual === "Да"}
                                    onChange={handleChange}
                                    required
                                />
                                Да
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="multilingual"
                                    value="Нет"
                                    checked={formData.multilingual === "Нет"}
                                    onChange={handleChange}
                                />
                                Нет
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                </Section>

                <Section>
                    <h2>5 Технические детали</h2>
                    <FormGroup>
                        <Label>5.1 Какие устройства и разрешения экрана особенно важны?</Label>
                        <MultiSelect
                            name="importantDevices"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, 'importantDevices', 2)}
                            value=""// Очищаем значение после выбора
                        >
                            <option value="">Выберите один или несколько вариантов</option>
                            <option value="Мобильные ">Мобильные</option>
                            <option value="Планшеты">Планшеты</option>
                            <option value="ПК">ПК</option>

                        </MultiSelect>

                        <SelectedOptions>
                            {changeSelectedOptions('importantDevices')}
                        </SelectedOptions>
                    </FormGroup>
                    <FormGroup>
                        <Label>5.2 Где будет размещён сайт?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hosting"
                                    value="У нас уже есть хостинг и домен"
                                    checked={formData.hosting === "У нас уже есть хостинг и домен"}
                                    onChange={handleChange}
                                    required
                                />
                                У нас уже есть хостинг и домен
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hosting"
                                    value="Нужно помочь с выбором хостинга и домена"
                                    checked={formData.hosting === "Нужно помочь с выбором хостинга и домена"}
                                    onChange={handleChange}
                                />
                                Нужно помочь с выбором хостинга и домена
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                </Section>
                <Section>
                    <h2>6 Конкуренты и рынок</h2>
                    <FormGroup>
                        <Label>6.1 Какие сайты конкурентов вам нравятся и почему?</Label>
                        <TextArea
                            name="competitorLinks"
                            value={formData.competitorLinks}
                            onChange={handleChange}
                            placeholder="Укажите ссылки:"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>6.2 Какие ошибки конкурентов вы хотите избежать?</Label>
                        <TextArea
                            name="competitorMistakes"
                            value={formData.competitorMistakes}
                            onChange={handleChange}
                            placeholder="Опишите:"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>6.3 Есть ли уникальное торговое предложение (USP), которое нужно выделить?</Label>
                        <TextArea
                            name="usp"
                            value={formData.usp}
                            onChange={handleChange}
                            placeholder="Если да, то опишите:   "
                        />
                    </FormGroup>
                </Section>
                <Section>
                    <h2>7 Дедлайны и бюджет</h2>
                    <FormGroup>
                        <Label>7.1 Когда вам нужен готовый сайт?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="deadline"
                                    value="Срочно (до 3 недель)"
                                    checked={formData.deadline === "Срочно (до 3 недель)"}
                                    onChange={handleChange}
                                    required
                                />
                                Срочно (до 3 недель)
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="deadline"
                                    value="В течение месяца"
                                    checked={formData.deadline === "В течение месяца"}
                                    onChange={handleChange}
                                />
                                В течение месяца
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="deadline"
                                    value=" Не спешим"
                                    checked={formData.deadline === " Не спешим"}
                                    onChange={handleChange}
                                />
                                Не спешим
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>7.2 Есть ли ограничения по стоимости разработки?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="budget"
                                    value="Нет"
                                    checked={formData.budget === "Нет"}
                                    onChange={handleChange}
                                />
                                Нет
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="budget"
                                    value="Да:"
                                    checked={formData.budget === "Да:"}
                                    onChange={handleChange}
                                />
                                Да:
                            </RadioLabel>
                            {formData.budget.includes("Да:") && (
                                <Input
                                    type="text"
                                    name="customBudget"
                                    value={formData.customBudget}
                                    onChange={handleChange}
                                    placeholder="Укажите бюджет"
                                    required
                                />
                            )}

                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>7.3 Нужно ли предусмотреть будущие доработки или поддержку?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsSupport"
                                    value="Нет"
                                    checked={formData.needsSupport === "Нет"}
                                    onChange={handleChange}
                                />
                                Нет
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsSupport"
                                    value="yes"
                                    checked={formData.needsSupport === "yes"}
                                    onChange={handleChange}
                                />
                                Да
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                </Section>

                <p>Благодарим вас за уделённое время! Ваши ответы помогут нам создать сайт, который максимально
                    соответствует
                    вашим целям и ожиданиям. Если у вас есть дополнительные пожелания, будем рады их обсудить!</p>
                <FormGroup>
                    <TextArea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        placeholder="Опишите:   "
                    />
                </FormGroup>

                <SubmitButton type="submit" onClick={() => setIsModalOpen(true)}>Отправить опрос</SubmitButton>
            </Form>
        </FormContainer>
    );
};
export default SurveyFormRus;