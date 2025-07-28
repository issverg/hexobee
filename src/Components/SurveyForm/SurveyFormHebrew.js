import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import * as emailjs from "@emailjs/browser";
import ModalWindow from "../../Utils/ModalWindow";
import ScrollDownButton from "../../Utils/ScrollDownButton";

const FormContainer = styled.div`
    direction: rtl;
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
            alert(`אתה יכול לבחור עד ${maxSelections} אפשרויות`);
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
                <h1>סקר לפיתוח אתר בעל עמוד אחד</h1>
                <p>אנא מלא את הטופס כדי שנוכל ליצור אתר שיענה על הציפיות שלך.</p>
                <FormGroup>
                    <Label>כתוב את שמך או את שם החברה</Label>
                    <Input
                        name="name_client"
                        value={formData.name_client}
                        onChange={handleChange}
                        placeholder="הזן שם"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>אנא ספק מספר טלפון ליצירת קשר</Label>
                    <Input
                        type="tel"
                        name="phone_client"
                        value={formData.phone_client}
                        onChange={handleChange}
                        placeholder="הזן את מספר הטלפון שלך"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>אנא הכנס את כתובת הדוא"ל שלך</Label>
                    <Input
                        type="email"
                        name="mail_client"
                        value={formData.mail_client}
                        onChange={handleChange}
                        placeholder="הזן אימייל"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label dir="rtl">תארו את תחום העיסוק שלכם (מה העסק שלכם עושה)?</Label>
                    <Input
                        type="text"
                        name="what_business"
                        value={formData.what_business}
                        onChange={handleChange}
                        placeholder="תארו את תחום העיסוק של העסק, מטרותיו, באיזו מדינה (עיר) הוא פועל.
אם יש קישורים שמזכירים את העסק באינטרנט או ברשתות החברתיות – נא לצרף."
                        dir="rtl"
                        required
                    />
                </FormGroup>
                <Section>
                    <h2>1. מידע בסיסי</h2>
                    <FormGroup>
                        <Label>1.1 מה המטרה העיקרית של האתר?</Label>
                        <Select
                            name="mainGoal"
                            value={formData.mainGoal}
                            onChange={handleChange}
                        >
                            <option value="">-- בחר אפשרות --</option>
                            <option value="מכירות">מכירות</option>
                            <option value="משיכת לקוחות">משיכת לקוחות</option>
                            <option value="תִיק">תִיק</option>
                            <option value="מצגת מוצר">מצגת מוצר</option>
                            <option value="אתר מידע">אתר מידע</option>
                            <option value="כרטיס ביקור של החברה">כרטיס ביקור של החברה</option>
                            <option value="הרשמה לאירוע">הרשמה לאירוע</option>
                            <option value="אוסף מנויים">אוסף מנויים</option>
                            <option value="בדיקת השערות">בדיקת השערות</option>
                            <option value="מיתוג">מיתוג</option>
                            <option value="השקת מוצר או שירות חדש">השקת מוצר או שירות חדש</option>
                            <option value="קהילה או פורום">קהילה או פורום</option>
                            <option value="קידום אפליקציה לנייד">קידום אפליקציה לנייד</option>
                            <option value="פלטפורמת גיוס עובדים">פלטפורמת גיוס עובדים</option>
                            <option value="אחר">אחר</option>
                        </Select>
                        {formData.mainGoal === "אחר" && (
                            <Input
                                type="text"
                                name="customMainGoal"
                                value={formData.customMainGoal}
                                onChange={handleChange}
                                placeholder="ציין את המטרה שלך"
                                required
                            />
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>1.2 מי קהל היעד שלך?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="נוער (18-25 שנים)"
                                    checked={formData.targetAudience === "נוער (18-25 שנים)"}
                                    onChange={handleChange}
                                    required
                                />
                                נוער (18-25 שנים)
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="מבוגרים (26-45 שנים)"
                                    checked={formData.targetAudience === "מבוגרים (26-45 שנים)"}
                                    onChange={handleChange}
                                />
                                מבוגרים (26-45 שנים)
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="קשישים (56+ שנים)"
                                    checked={formData.targetAudience === "קשישים (56+ שנים)"}
                                    onChange={handleChange}
                                />
                                קשישים (56+ שנים)
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="targetAudience"
                                    value="custom"
                                    checked={formData.targetAudience === "custom"}
                                    onChange={handleChange}
                                />
                                קהל מתמחה:
                                {formData.targetAudience === 'custom' && (
                                    <Input
                                        type="text"
                                        name="customAudience"
                                        value={formData.customAudience}
                                        onChange={handleChange}
                                        placeholder="ציין את הקהל שלך"
                                        required
                                    />
                                )}
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>

                    <FormGroup>
                        <Label>1.3 מהי המוטיבציה של אנשים לבקר באתר זה?</Label>
                        <TextArea
                            name="motivation"
                            value={formData.motivation}
                            onChange={handleChange}
                            placeholder="איך האתר יפתור את הבעיות שלהם?"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>1.4 מה מייחד את העסק שלך?</Label>
                        <TextArea
                            name="uniqueness"
                            value={formData.uniqueness}
                            onChange={handleChange}
                            placeholder="תאר את התכונות הייחודיות של העסק שלך"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>1.5 איך אתה מדרג את ההצלחה של ביקור באתר?</Label>
                        <TextDescription>אנא בחר אפשרות אחת או יותר שלדעתך משקפת בצורה הטובה ביותר את האפקטיביות של האתר שלך:</TextDescription>
                        <MultiSelect
                            name="successMetrics"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, "successMetrics")}
                            value=""// Очищаем значение после выбора
                        >
                            <option value="">אנא בחר אפשרות אחת או יותר</option>
                            <option value="מספר בקשות או בקשות">מספר בקשות או בקשות</option>
                            <option value="מספר רכישות או הזמנות">מספר רכישות או הזמנות</option>
                            <option value="מנויים או הרשמות">מנויים או הרשמות</option>
                            <option value="המרה (היחס בין מבקרים לפעולות יעד)">המרה (היחס בין מבקרים לפעולות יעד)</option>
                            <option value="זמן בילוי באתר">זמן בילוי באתר</option>
                            <option value="שיעור יציאה מדף הכניסה (Bounce Rate)">שיעור יציאה מדף הכניסה (Bounce Rate)</option>
                            <option value="אחר">אחר</option>
                        </MultiSelect>
                        {formData.successMetrics === "אחר" && (
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
                        <Label>אילו פעולות מפתח על משתמש לבצע באתר?</Label>
                        <MultiSelect
                            name="keyActions"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, "keyActions")}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">אילו פעולות מפתח על משתמש לבצע באתר?</option>
                            <option value="מלא את הטופס">מלא את הטופס</option>
                            <option value="להתקשר">להתקשר</option>
                            <option value="הירשם לניוזלטר">הירשם לניוזלטר</option>
                            <option value="קבל מידע על השירות">קבל מידע על השירות</option>
                            <option value="שתף ברשתות חברתיות באמצעות כפתורים">שתף ברשתות חברתיות באמצעות כפתורים</option>
                            <option value="צפו בביקורות על השירות">צפו בביקורות על השירות</option>
                            <option value="בצע רכישה">בצע רכישה</option>
                            <option value="אחר">אחר</option>
                        </MultiSelect>
                        <SelectedOptions>
                            {changeSelectedOptions('keyActions')}
                        </SelectedOptions>
                        {formData.keyActions === "אחר" && (
                            <Input
                                type="text"
                                name="customKeyAction"
                                value={formData.customKeyAction}
                                onChange={handleChange}
                                placeholder="לְתַאֵר "
                                required
                            />
                        )}
                    </FormGroup>

                </Section>

                <Section>
                    <h2>2. סגנון והעדפות ויזואליות</h2>

                    <FormGroup>
                        <Label>2.1 אילו משאבי עיצוב יש לך? (בחר את כל מה שמתאים)</Label>
                        <CheckboxGroup>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="ספר מותג מוכן"
                                    checked={formData.designMaterials.includes("ספר מותג מוכן")}
                                    onChange={handleChange}
                                />
                                ספר מותג מוכן
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="זהות תאגידית"
                                    checked={formData.designMaterials.includes("זהות תאגידית")}
                                    onChange={handleChange}
                                />
                                זהות תאגידית
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="תוכן מוכן"
                                    checked={formData.designMaterials.includes("תוכן מוכן")}
                                    onChange={handleChange}
                                />
                                תוכן מוכן
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="תמונות וסרטונים"
                                    checked={formData.designMaterials.includes("תמונות וסרטונים")}
                                    onChange={handleChange}
                                />
                                תמונות וסרטונים
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value="אין חומרים"
                                    checked={formData.designMaterials.includes("אין חומרים")}
                                    onChange={handleChange}
                                />
                                אין חומרים
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="designMaterials"
                                    value='custom'
                                    checked={formData.designMaterials.includes('custom')}
                                    onChange={handleChange}
                                />
                                אחר
                            </CheckboxLabel>
                            {formData.designMaterials.includes('custom') && (
                                <Input
                                    type="text"
                                    name="customDesignMaterial"
                                    value={formData.customDesignMaterial}
                                    onChange={handleChange}
                                    placeholder="ציין חומרים אחרים"
                                />
                            )}
                        </CheckboxGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>2.2 מהם צבעי החתימה שלך?</Label>
                        <TextArea
                            name="brandColors"
                            value={formData.brandColors}
                            onChange={handleChange}
                            placeholder="ציין העדפות צבע עבור האתר שלך"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>2.3 אנא ספק הפניות (דוגמאות לאתרים שאתה אוהב)?</Label>
                        <TextArea
                            name="references"
                            value={formData.references}
                            onChange={handleChange}
                            placeholder="תן קישורים"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>2.4 איזה סגנון אתה מעדיף?</Label>
                        <CheckboxGroup>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="מִעוּטָנוּת"
                                    checked={formData.stylePreference.includes("מִעוּטָנוּת")}
                                    onChange={handleChange}
                                />
                                מִעוּטָנוּת
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="תאגידי"
                                    checked={formData.stylePreference.includes("תאגידי")}
                                    onChange={handleChange}
                                />
                                תאגידי
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="עֲתִידָנִי"
                                    checked={formData.stylePreference.includes("עֲתִידָנִי")}
                                    onChange={handleChange}
                                />
                                עֲתִידָנִי
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="רטרו"
                                    checked={formData.stylePreference.includes("רטרו")}
                                    onChange={handleChange}
                                />
                                רטרו
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    name="stylePreference"
                                    value="אחר"
                                    checked={formData.stylePreference.includes("אחר")}
                                    onChange={handleChange}
                                />
                                אחר
                                {formData.stylePreference.includes("אחר") && (
                                    <Input
                                        type="text"
                                        name="customStylePreference"
                                        value={formData.customStylePreference}
                                        onChange={handleChange}
                                        placeholder="ציין סגנונות אחרים"
                                        required
                                    />
                                )}
                            </CheckboxLabel>
                        </CheckboxGroup>
                    </FormGroup>
                </Section>
                <Section>
                    <h2>3 תוֹכֶן</h2>
                    <FormGroup>
                        <Label>3.1 יש לכם טקסטים, תמונות, סרטונים מוכנים?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="contentReady"
                                    value="כן, הכל מוכן"
                                    checked={formData.contentReady === "כן, הכל מוכן"}
                                    onChange={handleChange}
                                    required
                                />
                                כן, הכל מוכן
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="contentReady"
                                    value="חֶלקִית"
                                    checked={formData.contentReady === "חֶלקִית"}
                                    onChange={handleChange}
                                />
                                חֶלקִית
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="contentReady"
                                    value="לא, צריך ליצור"
                                    checked={formData.contentReady === 'לא, צריך ליצור'}
                                    onChange={handleChange}
                                />
                                לא, צריך ליצור
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>3.2 יש לכם טקסטים, תמונות, סרטונים מוכנים?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hasLogo"
                                    value="כן"
                                    checked={formData.hasLogo === 'כן'}
                                    onChange={handleChange}
                                />
                                כן
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hasLogo"
                                    value="לא, צריך לפתח את זה"
                                    checked={formData.hasLogo === 'לא, צריך לפתח את זה'}
                                    onChange={handleChange}
                                />
                                לא, צריך לפתח את זה
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>3.3 מהו מספר הטלפון הראשי של החברה שלך?</Label>
                        <TextArea
                            name="mainPhoneNumber"
                            value={formData.mainPhoneNumber}
                            onChange={handleChange}
                            placeholder="נא להזין את מספר הטלפון שלך"
                        />
                    </FormGroup>

                </Section>

                <Section>
                    <h2>4 פונקציונליות</h2>
                    <FormGroup>
                        <Label>4.1 אילו קטעים אתר אינטרנט צריך לכלול? (בחר את אלה שאתה צריך)</Label>
                        <MultiSelect
                            name="sections"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, 'sections', 5)}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">אנא בחר אפשרות אחת או יותר</option>
                            <option value="אודותינו">אודותינו</option>
                            <option value="שירותים">שירותים</option>
                            <option value="תִיק">תִיק</option>
                            <option value="היתרונות שלנו">היתרונות שלנו</option>
                            <option value="אנשי קשר">אנשי קשר</option>
                            <option value="ביקורות">ביקורות</option>
                            <option value="אחר">אחר</option>
                        </MultiSelect>
                        <SelectedOptions>
                            {changeSelectedOptions('sections')}
                        </SelectedOptions>
                        {formData.sections === "אחר" && (
                            <Input
                                type="text"
                                name="customSection"
                                value={formData.customSection}
                                onChange={handleChange}
                                placeholder="לתאר... "
                                required
                            />
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label>4.2 האם אתה צריך משוב או טפסי הרשמה?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsForms"
                                    value="כן"
                                    checked={formData.needsForms === 'כן'}
                                    onChange={handleChange}
                                    required
                                />
                                כן
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsForms"
                                    value="no"
                                    checked={formData.needsForms === 'לא'}
                                    onChange={handleChange}
                                />
                                לא
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.3 איך אתה רוצה שהמשתמש ייצור איתך קשר?</Label>
                        <MultiSelect
                            name="contactMethod"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, 'contactMethod', 5)}
                            value="" // Очищаем значение после выбора
                        >
                            <option value="">אנא בחר אפשרות אחת או יותר</option>
                            <option value="באמצעות טופס ששולח נתוני משתמש למייל">
                                באמצעות טופס ששולח נתוני משתמש למייל
                            </option>
                            <option value="דרך כפתור שלוקח אותו לצ'אט וואטסאפ">
                                דרך כפתור שלוקח אותו לצ'אט וואטסאפ
                            </option>
                            <option value="פשוט דרך אנשי הקשר הרשומים בדף האתר">
                                פשוט דרך אנשי הקשר הרשומים בדף האתר
                            </option>
                            <option
                                value="באמצעות אייקונים שלוקחים את המשתמש לדפי המדיה החברתית שלך. רשתות">
                                באמצעות אייקונים שלוקחים את המשתמש לדפי המדיה החברתית שלך. רשתות
                            </option>
                            <option value="כל האפשרויות">כל האפשרויות</option>
                        </MultiSelect>
                        <SelectedOptions>
                            {changeSelectedOptions('contactMethod')}
                        </SelectedOptions>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.4 האם אתה צריך אנימציה, אלמנטים אינטראקטיביים?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsAnimation"
                                    value="כן"
                                    checked={formData.needsAnimation === "כן"}
                                    onChange={handleChange}
                                    required
                                />
                                כן
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsAnimation"
                                    value="לא"
                                    checked={formData.needsAnimation === "לא"}
                                    onChange={handleChange}
                                />
                                לא
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>4.5 האם מתוכננת רב לשוניות?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="multilingual"
                                    value="כן"
                                    checked={formData.multilingual === "כן"}
                                    onChange={handleChange}
                                    required
                                />
                                כן
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="multilingual"
                                    value="לא"
                                    checked={formData.multilingual === "לא"}
                                    onChange={handleChange}
                                />
                                לא
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                </Section>

                <Section>
                    <h2>5 פרטים טכניים</h2>
                    <FormGroup>
                        <Label>5.1 אילו מכשירים ורזולוציות מסך חשובים במיוחד?</Label>
                        <MultiSelect
                            name="importantDevices"
                            onChange={(e) => handleMultiSelect(e, formData, setFormData, 'importantDevices', 2)}
                            value=""// Очищаем значение после выбора
                        >
                            <option value="">אנא בחר אפשרות אחת או יותר</option>
                            <option value="נייד">נייד</option>
                            <option value="טאבלטים">טאבלטים</option>
                            <option value="PC">PC</option>

                        </MultiSelect>

                        <SelectedOptions>
                            {changeSelectedOptions('importantDevices')}
                        </SelectedOptions>
                    </FormGroup>
                    <FormGroup>
                        <Label>5.2 היכן ימוקם האתר?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hosting"
                                    value="כבר יש לנו אירוח ודומיין"
                                    checked={formData.hosting === "כבר יש לנו אירוח ודומיין"}
                                    onChange={handleChange}
                                    required
                                />
                                כבר יש לנו אירוח ודומיין
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="hosting"
                                    value="צריך עזרה בבחירת אירוח ודומיין"
                                    checked={formData.hosting === "צריך עזרה בבחירת אירוח ודומיין"}
                                    onChange={handleChange}
                                />
                                צריך עזרה בבחירת אירוח ודומיין
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                </Section>
                <Section>
                    <h2>6 המתחרים והשוק</h2>
                    <FormGroup>
                        <Label>6.1 מהו מספר הטלפון הראשי של החברה שלך?</Label>
                        <TextArea
                            name="competitorLinks"
                            value={formData.competitorLinks}
                            onChange={handleChange}
                            placeholder="ספק קישורים:"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>6.2 אילו טעויות עושים המתחרים שלך שאתה רוצה להימנע מהם?</Label>
                        <TextArea
                            name="competitorMistakes"
                            value={formData.competitorMistakes}
                            onChange={handleChange}
                            placeholder="לְתַאֵר:"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>6.3האם יש הצעת מכירה ייחודית (USP) שצריך להדגיש?</Label>
                        <TextArea
                            name="usp"
                            value={formData.usp}
                            onChange={handleChange}
                            placeholder="אם כן, אנא תאר:   "
                        />
                    </FormGroup>
                </Section>
                <Section>
                    <h2>7 מועדים ותקציב</h2>
                    <FormGroup>
                        <Label>7.1 מתי צריך אתר מוכן?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="deadline"
                                    value="דחוף (עד 3 שבועות)"
                                    checked={formData.deadline === "דחוף (עד 3 שבועות)"}
                                    onChange={handleChange}
                                    required
                                />
                                דחוף (עד 3 שבועות)
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="deadline"
                                    value="תוך חודש"
                                    checked={formData.deadline === "תוך חודש"}
                                    onChange={handleChange}
                                />
                                תוך חודש
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="deadline"
                                    value="אנחנו לא ממהרים"
                                    checked={formData.deadline === "אנחנו לא ממהרים"}
                                    onChange={handleChange}
                                />
                                אנחנו לא ממהרים
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>7.2 האם יש מגבלות על עלויות הפיתוח?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="budget"
                                    value="לא"
                                    checked={formData.budget === "לא"}
                                    onChange={handleChange}
                                />
                                לא
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="budget"
                                    value="כן:"
                                    checked={formData.budget === "כן:"}
                                    onChange={handleChange}
                                />
                                כן:
                            </RadioLabel>
                            {formData.budget.includes("כן:") && (
                                <Input
                                    type="text"
                                    name="customBudget"
                                    value={formData.customBudget}
                                    onChange={handleChange}
                                    placeholder="ציין את התקציב שלך"
                                    required
                                />
                            )}

                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>7.3 האם יש צורך לספק שיפורים או תמיכה עתידיים?</Label>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsSupport"
                                    value="לא"
                                    checked={formData.needsSupport === "לא"}
                                    onChange={handleChange}
                                />
                                לא
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="needsSupport"
                                    value="כן"
                                    checked={formData.needsSupport === "כן"}
                                    onChange={handleChange}
                                />
                                כן
                            </RadioLabel>
                        </RadioGroup>
                    </FormGroup>
                </Section>

                <p>תודה על זמנך! התשובות שלך יעזרו לנו ליצור אתר שיענה בצורה הטובה ביותר על המטרות והציפיות שלך. אם יש לך משאלות נוספות, נשמח לדון בהן!</p>
                <FormGroup>
                    <TextArea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        placeholder="לְתַאֵר:   "
                    />
                </FormGroup>

                <SubmitButton type="submit" onClick={() => setIsModalOpen(true)}>שלח סקר</SubmitButton>
            </Form>
        </FormContainer>
    );
};
export default SurveyFormRus;