import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import * as emailjs from "@emailjs/browser";
import ModalWindow from "../../Utils/ModalWindow";
import ScrollDownButton from "../../Utils/ScrollDownButton";

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
            alert(`You can select up to ${maxSelections} options`);
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
                console.log('Письмо успешно отправлено!');
                setIsModalOpen(true);
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
        <FormContainer>
            <ScrollDownButton/>
            <ModalWindow isModalOpen={isModalOpen}/>
            <Form ref={form} onSubmit={handleSubmit}>
                <Return href="/"></Return>
                <h1>SURVEY FOR THE DEVELOPMENT OF A ONE-PAGE SITE</h1>
                <p>Please fill out the form so we can create a website that meets your expectations.</p>
                <FormGroup>
                    <Label>Write your name or company name</Label>
                    <Input
                        name="name_client"
                        value={formData.name_client}
                        onChange={handleChange}
                        placeholder="Enter name"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Please write a contact phone number</Label>
                    <Input
                        type="tel"
                        name="phone_client"
                        value={formData.phone_client}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Please write your email address</Label>
                    <Input
                        type="email"
                        name="mail_client"
                        value={formData.mail_client}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Describe what you do (what does your business do)?</Label>
                    <Input
                        type="text"
                        name="what_business"
                        value={formData.what_business}
                        onChange={handleChange}
                        placeholder="Describe your business direction, its goals, and the country (city) you operate in.
If available, provide links where your company is mentioned online or on social media..."
                        required
                    />
                </FormGroup>
                <Section>
                    <h2>1. Basic information</h2>
                    <FormGroup>
                        <Label>1.1 What is the main purpose of the site?</Label>
                        <Select
                            name="mainGoal"
                            value={formData.mainGoal}
                            onChange={handleChange}
                        >
                            <option value="">-- Select an option --</option>
                            <option value="Sales">Sales</option>
                            <option value="Attracting clients">Attracting clients</option>
                            <option value="Portfolio">Portfolio</option>
                            <option value="Product presentation">Product presentation</option>
                            <option value="Information site">Information site</option>
                            <option value="Company business card">Company business card</option>
                            <option value="Registration for the event">Registration for the event</option>
                            <option value="Collection of subscribers">Collection of subscribers</option>
                            <option value="Hypothesis testing">Hypothesis testing</option>
                            <option value="Branding">Branding</option>
                            <option value="Launching a new product or service">Launching a new product or service</option>
                            <option value="Community or forum">Community or forum</option>
                            <option value="Mobile application promotion">Mobile application promotion</option>
                            <option value="Recruitment platform">Recruitment platform</option>
                            <option value="Other">Other</option>
                        </Select>
                        {formData.mainGoal === "Other" && (
                            <Input
                                type="text"
                                name="customMainGoal"
                                value={formData.customMainGoal}
                                onChange={handleChange}
                                placeholder="Specify your goal"
                                required
                            />
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>1.2 Who is your target audience?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="Youth (18-25 years)"
                                    checked={formData.targetAudience === "Youth (18-25 years)"}
                                    onChange={handleChange}
                                    required
                                />
                                Youth (18-25 years)
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="Adults (26-55 years)"
                                    checked={formData.targetAudience === "Adults (26-55 years)"}
                                    onChange={handleChange}
                                />
                                Adults (26-55 years)
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="Elderly (56+ years)"
                                    checked={formData.targetAudience === "Elderly (56+ years)"}
                                    onChange={handleChange}
                                />
                                Elderly (56+ years)
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="custom"
                                    checked={formData.targetAudience === "custom"}
                                    onChange={handleChange}
                                />
                                Specialized audience:
                                {formData.targetAudience === 'custom' && (
                                    <Input
                                        type="text"
                                        name="customAudience"
                                        value={formData.customAudience}
                                        onChange={handleChange}
                                        placeholder="Specify your audience"
                                        required
                                    />
                                )}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>

                    <FormGroup>
                        <Label>1.3 What is the motivation for people to visit this site?</Label>
                        <TextArea
                            name="motivation"
                            value={formData.motivation}
                            onChange={handleChange}
                            placeholder="How will the site solve their problems?"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>1.4 What makes your business unique?</Label>
                        <TextArea
                            name="uniqueness"
                            value={formData.uniqueness}
                            onChange={handleChange}
                            placeholder="Describe the unique features of your business"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>1.5 How do you rate the success of a site visit?</Label>
                        <TextDescription>Please select one or more options that you think best reflect the effectiveness of your site:</TextDescription>
                        <MultiSelect
                            name="successMetrics"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, "successMetrics")}
                            value=""// Очищаем значение после выбора
                        >
                            <option value="">Please select one or more options</option>
                            <option value="Number of applications or requests">Number of applications or requests</option>
                            <option value="Number of purchases or orders">Number of purchases or orders</option>
                            <option value="Subscriptions or registrations">Subscriptions or registrations</option>
                            <option value="Conversion (the ratio of visitors to target actions)">Conversion (the ratio of visitors to target actions)</option>
                            <option value="Time spent on site">Time spent on site</option>
                            <option value="Bounce Rate">Bounce Rate</option>
                            <option value="Other">Other</option>
                        </MultiSelect>
                        {formData.successMetrics === "Other" && (
                            <Input
                                type="text"
                                name="customSuccessMetric"
                                value={formData.customSuccessMetric}
                                onChange={handleChange}
                                placeholder="Describe... "
                                required
                            />
                        )}
                        <SelectedOptions>
                            {changeSelectedOptions('successMetrics')}
                        </SelectedOptions>
                    </FormGroup>

                    <FormGroup>
                        <Label>1.6 What key actions should a user take on a website?</Label>
                        <MultiSelect
                            name="keyActions"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, "keyActions")}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">Please select one or more options</option>
                            <option value="Fill out the form">Fill out the form</option>
                            <option value="Call">Call</option>
                            <option value="Subscribe to the newsletter">Subscribe to the newsletter</option>
                            <option value="Get information about the service">Get information about the service</option>
                            <option value="Share on social networks using buttons.">Share on social networks using buttons.</option>
                            <option value="View reviews of the service">View reviews of the service</option>
                            <option value="Make a purchase">Make a purchase</option>
                            <option value="Other">Other</option>
                        </MultiSelect>
                        <SelectedOptions>
                            {changeSelectedOptions('keyActions')}
                        </SelectedOptions>
                        {formData.keyActions === "Other" && (
                            <Input
                                type="text"
                                name="customKeyAction"
                                value={formData.customKeyAction}
                                onChange={handleChange}
                                placeholder="Describe... "
                                required
                            />
                        )}
                    </FormGroup>

                </Section>

                <Section>
                    <h2>2. Style and visual preferences</h2>

                    <FormGroup>
                        <Label>2.1 What design resources do you have? (Select all that apply)</Label>
                        <CheckboxGroup>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="Ready brand book"
                                    checked={formData.designMaterials.includes("Ready brand book")}
                                    onChange={handleChange}
                                />
                                Ready brand book
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="Corporate identity"
                                    checked={formData.designMaterials.includes("Corporate identity")}
                                    onChange={handleChange}
                                />
                                Corporate identity
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="Ready content"
                                    checked={formData.designMaterials.includes("Ready content")}
                                    onChange={handleChange}
                                />
                                Ready content
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="Photos and videos"
                                    checked={formData.designMaterials.includes("Photos and videos")}
                                    onChange={handleChange}
                                />
                                Photos and videos
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="There are no materials"
                                    checked={formData.designMaterials.includes("There are no materials")}
                                    onChange={handleChange}
                                />
                                There are no materials
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value='custom'
                                    checked={formData.designMaterials.includes('custom')}
                                    onChange={handleChange}
                                />
                                Other materials:
                            </CheckboxLabel>
                            {formData.designMaterials.includes('custom') && (
                                <Input
                                    type="text"
                                    name="customDesignMaterial"
                                    value={formData.customDesignMaterial}
                                    onChange={handleChange}
                                    placeholder="Specify other materials"
                                />
                            )}
                        </CheckboxGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>2.2 What are your signature colors?</Label>
                        <TextArea
                            name="brandColors"
                            value={formData.brandColors}
                            onChange={handleChange}
                            placeholder="Specify color preferences for your website"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>2.3 Please provide references (examples of websites you like)?</Label>
                        <TextArea
                            name="references"
                            value={formData.references}
                            onChange={handleChange}
                            placeholder="Provide links"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>2.4 What style do you prefer?</Label>
                        <CheckboxGroup>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="Minimalism"
                                    checked={formData.stylePreference.includes("Minimalism")}
                                    onChange={handleChange}
                                />
                                Minimalism
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="Corporate"
                                    checked={formData.stylePreference.includes("Corporate")}
                                    onChange={handleChange}
                                />
                                Corporate
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="Futuristic"
                                    checked={formData.stylePreference.includes("Futuristic")}
                                    onChange={handleChange}
                                />
                                Futuristic
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="Retro"
                                    checked={formData.stylePreference.includes("Retro")}
                                    onChange={handleChange}
                                />
                                Retro
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="Other"
                                    checked={formData.stylePreference.includes("Other")}
                                    onChange={handleChange}
                                />
                                Other:
                                {formData.stylePreference.includes("Other") && (
                                    <Input
                                        type="text"
                                        name="customStylePreference"
                                        value={formData.customStylePreference}
                                        onChange={handleChange}
                                        placeholder="Specify other styles"
                                        required
                                    />
                                )}
                            </CheckboxLabel>
                        </CheckboxGroup>
                    </FormGroup>
                </Section>
                <Section>
                    <h2>3 Content</h2>
                    <FormGroup>
                        <Label>3.1 Do you have ready-made texts, images, videos?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="contentReady"
                                    value="Yes, everything is ready"
                                    checked={formData.contentReady === "Yes, everything is ready"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes, everything is ready
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="contentReady"
                                    value="Partially"
                                    checked={formData.contentReady === "Partially"}
                                    onChange={handleChange}
                                />
                                Partially
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="contentReady"
                                    value="no"
                                    checked={formData.contentReady === 'no'}
                                    onChange={handleChange}
                                />
                                No, you need to create
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>3.2 Do you have ready-made texts, images, videos?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hasLogo"
                                    value="yes"
                                    checked={formData.hasLogo === 'yes'}
                                    onChange={handleChange}
                                />
                                Yes
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hasLogo"
                                    value="no"
                                    checked={formData.hasLogo === 'no'}
                                    onChange={handleChange}
                                />
                                No, it needs to be developed
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>3.3 What is the primary phone number for your company?</Label>
                        <TextArea
                            name="mainPhoneNumber"
                            value={formData.mainPhoneNumber}
                            onChange={handleChange}
                            placeholder="Please enter your phone number "
                        />
                    </FormGroup>

                </Section>

                <Section>
                    <h2>4 Functionality</h2>
                    <FormGroup>
                        <Label>4.1 What sections should a site include? (Select the required ones)</Label>
                        <MultiSelect
                            name="sections"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, 'sections', 5)}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">Please select one or more options</option>
                            <option value="About Us">About Us</option>
                            <option value="Services">Services</option>
                            <option value="Portfolio">Portfolio</option>
                            <option value="Our advantages">Our advantages</option>
                            <option value="Contacts">Contacts</option>
                            <option value="Reviews">Reviews</option>
                            <option value="Other">Other</option>
                        </MultiSelect>
                        <SelectedOptions>
                            {changeSelectedOptions('sections')}
                        </SelectedOptions>
                        {formData.sections === "Other" && (
                            <Input
                                type="text"
                                name="customSection"
                                value={formData.customSection}
                                onChange={handleChange}
                                placeholder="Describe... "
                                required
                            />
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label>4.2 Do you need feedback or subscription forms?</Label>
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
                                Yes
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsForms"
                                    value="no"
                                    checked={formData.needsForms === 'no'}
                                    onChange={handleChange}
                                />
                                No
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.3 How do you want the user to contact you? </Label>
                        <MultiSelect
                            name="contactMethod"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, 'contactMethod', 5)}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">Please select one or more options</option>
                            <option value="Through a form that sends user data to email">
                                Through a form that sends user data to email
                            </option>
                            <option value="Through a button that takes him to a WhatsApp chat">
                                Through a button that takes him to a WhatsApp chat
                            </option>
                            <option value="Simply through the contacts listed on the website page">
                                Simply through the contacts listed on the website page
                            </option>
                            <option
                                value="Through icons that take the user to your social network pages.">
                                Through icons that take the user to your social network pages.
                            </option>
                            <option value="All options">All options</option>
                        </MultiSelect>
                        <SelectedOptions>
                            {changeSelectedOptions('contactMethod')}
                        </SelectedOptions>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.4 Is animation or interactive elements required?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsAnimation"
                                    value="Yes"
                                    checked={formData.needsAnimation === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsAnimation"
                                    value="No"
                                    checked={formData.needsAnimation === "No"}
                                    onChange={handleChange}
                                />
                               No
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.5 Is multilingualism planned?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="multilingual"
                                    value="Yes"
                                    checked={formData.multilingual === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="multilingual"
                                    value="No"
                                    checked={formData.multilingual === "No"}
                                    onChange={handleChange}
                                />
                               No
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                </Section>

                <Section>
                    <h2>5 Technical details</h2>
                    <FormGroup>
                        <Label>5.1 Which devices and screen resolutions are especially important?</Label>
                        <MultiSelect
                            name="importantDevices"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, 'importantDevices', 2)}
                            value=""// Очищаем значение после выбора
                        >
                            <option value="">Please select one or more options</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Tablets">Tablets</option>
                            <option value="PC">PC</option>

                        </MultiSelect>

                        <SelectedOptions>
                            {changeSelectedOptions('importantDevices')}
                        </SelectedOptions>
                    </FormGroup>
                    <FormGroup>
                        <Label>5.2 Where will the site be located?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hosting"
                                    value="We already have hosting and a domain"
                                    checked={formData.hosting === "We already have hosting and a domain"}
                                    onChange={handleChange}
                                    required
                                />
                                We already have hosting and a domain
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hosting"
                                    value="Need help choosing hosting and domain"
                                    checked={formData.hosting === "Need help choosing hosting and domain"}
                                    onChange={handleChange}
                                />
                                Need help choosing hosting and domain
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                </Section>
                <Section>
                    <h2>6 Competitors and the Market</h2>
                    <FormGroup>
                        <Label>6.1 What is the primary phone number for your company?</Label>
                        <TextArea
                            name="competitorLinks"
                            value={formData.competitorLinks}
                            onChange={handleChange}
                            required={true}
                            placeholder="Provide links: "
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>6.2 What mistakes do your competitors make that you want to avoid?</Label>
                        <TextArea
                            name="competitorMistakes"
                            value={formData.competitorMistakes}
                            onChange={handleChange}
                            placeholder="Describe mistakes: "
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>6.3 Is there a unique selling proposition (USP) that needs to be highlighted?</Label>
                        <TextArea
                            name="usp"
                            value={formData.usp}
                            onChange={handleChange}
                            placeholder="If yes, please describe:   "
                        />
                    </FormGroup>
                </Section>
                <Section>
                    <h2>7 Deadlines and budget</h2>
                    <FormGroup>
                        <Label>7.1 When do you need a ready-made website?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="deadline"
                                    value="Urgent (up to 3 weeks)"
                                    checked={formData.deadline === "Urgent (up to 3 weeks)"}
                                    onChange={handleChange}
                                    required
                                />
                                Urgent (up to 3 weeks)
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="deadline"
                                    value="Within a month"
                                    checked={formData.deadline === "Within a month"}
                                    onChange={handleChange}
                                />
                                Within a month
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="deadline"
                                    value="We're not in a hurry"
                                    checked={formData.deadline === "We're not in a hurry"}
                                    onChange={handleChange}
                                />
                                We're not in a hurry
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>7.2 Are there any limits on development costs?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="budget"
                                    value="No"
                                    checked={formData.budget === "No"}
                                    onChange={handleChange}
                                />
                                No
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="budget"
                                    value="Yes"
                                    checked={formData.budget === "Yes"}
                                    onChange={handleChange}
                                />
                                Yes:
                            </RadioLabel>
                            {formData.budget.includes("Yes") && (
                                <Input
                                    type="text"
                                    name="customBudget"
                                    value={formData.customBudget}
                                    onChange={handleChange}
                                    placeholder="Specify your budget "
                                    required
                                />
                            )}

                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>7.3 Is there a need to provide for future improvements or support?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsSupport"
                                    value="No"
                                    checked={formData.needsSupport === "No"}
                                    onChange={handleChange}
                                />
                                No
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsSupport"
                                    value="Yes"
                                    checked={formData.needsSupport === "Yes"}
                                    onChange={handleChange}
                                />
                               Yes
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                </Section>

                <p>Thank you for your time! Your answers will help us create a website that best meets your goals and expectations.
                    If you have any additional requests, we will be happy to discuss them!</p>
                <FormGroup>
                    <TextArea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        placeholder="Describe any additional requests:   "
                    />
                </FormGroup>

                <SubmitButton type="submit" onClick={() => setIsModalOpen(true)}>Send Request</SubmitButton>
            </Form>
        </FormContainer>
    );
};
export default SurveyFormRus;