import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Link from 'next/link';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function FactoryGuide() {
    return (
        <div className='content'>
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span"> Регистрация и вход в систему</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>
                            Для регистрации на нашей платформе перейдите на <Link href="/newfactory"> страницу регистрации</Link>
                        </p>

                        <p>
                            заполните необходимые поля и отправьте заявку.
                        </p>
                        <p>
                            🔑 После регистрации вы получите доступ к личному кабинету, где сможете добавлять товары, управлять заказами и участвовать в акциях.
                        </p>

                    </AccordionDetails>
                </Accordion>


                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span"> Добавление товаров</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>
                            Чтобы добавить товар:
                        </p>
                        <p className='NestedP'>
                            - перейдите в <Link href="/account-factory"> личный кабинет</Link>
                        </p>
                        <p className='NestedP'>
                            - нажмите <Button size='small' sx={{ backgroundColor: "#CD0000", color: "white", marginLeft: "24px" }}>Добавить товар <AddCircleIcon style={{ marginLeft: "12px" }} /></Button>
                        </p>
                        <p className='NestedP'>
                            - заполните <strong> каждое поле </strong> своего товара
                        </p>
                        <p className='NestedP'>
                            - введите <strong> название товара</strong>
                        </p>
                        <p className='NestedP'>
                            - выберите <strong>категорию</strong> из доступных
                        </p>
                        <p className='NestedP'>
                            - <strong>раздел</strong> - иногда, существующих категорий может не хватить для спецификаций вашего товара, поэтому, вы можете создать свой раздел, и хранить в нем свои товары. Если существующих категорий вам не хватает, создайте свой раздел - все, что надо - дать ему название.
                        </p>
                        <p className='NestedP'>
                            - <strong>размеры</strong> - т.к. optal - оптовый маркетплейс, большинство товаров покупаются не штуками, а линейками. В одной линейке - идут сразу все размеры этого товара. Некторые размеры могут повторяться.<br /> Вот допустимые примеры:
                            <span className='ValideSize'>
                                - 40, 42, 44, 44, 46, 46, 48
                            </span>
                            <span className='ValideSize'>
                                - S, M, M, L, XL, XXL
                            </span>
                            <span className='ValideSize'>
                                - 80см, 90см, 90см, 100см, 120см
                            </span>
                        </p>
                        <p className='NestedP'>
                            - <strong>расцветки.</strong> У вашего товара может быть несколько цветовых вариантов. Добавьте сколько угодно расцветок вашему товару: выберите фотографию и название цвета
                        </p>
                        <p className='NestedP'>
                            - <strong>цена</strong> выставьте цену своему товару в кыргызских сомах
                        </p>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">Заказы</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>
                            Когда покупатель оформляет заказ на платформе, наша команда связывается с вами по телефону, чтобы уточнить:
                        </p>
                        <p className='NestedP'>
                            - Наличие товара

                        </p>
                        <p className='NestedP'>
                            - Актуальную цену
                        </p>
                        <p>
                            После этого мы самостоятельно информируем покупателя и подтверждаем заказ.
                        </p>
                        <p>
                            Важно: Контакты покупателей не передаются продавцам, чтобы обеспечить безопасность и удобство обработки заказов через нашу платформу.</p>
                        <p>
                            В будущем в вашем личном кабинете появится возможность самостоятельно управлять заказами, отслеживать их статусы и обновлять информацию.
                        </p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">Акции и скидки</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>
                            В процессе разработки...
                        </p>
                        <p>
                            Скоро у вас появится возможность увеличивать продажи за счет акций!
                        </p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">Вопросы и поддержка</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>
                            Если у вас возникли вопросы или требуется помощь в использовании платформы, вы всегда можете обратиться к нашему менеджеру Адымару.
                        </p>
                        <p>
                            📞 Контактный номер: <Link href="tel:+996556010516"></Link>+996 556 010 516
                        </p>
                        <p>
                            🕒 Время работы: 24/7
                        </p>
                        <p>
                            Мы всегда готовы помочь вам с:
                        </p>
                        <p className='NestedP'>
                            Регистрацией и настройкой вашего профиля.
                        </p>
                        <p className='NestedP'>
                            Добавлением и управлением товарами.
                        </p>
                        <p className='NestedP'>
                            Участием в акциях и других маркетинговых возможностях.
                        </p>
                        <p className='NestedP'>
                            Разрешением любых вопросов, связанных с заказами и сотрудничеством.
                        </p>
                        <p>
                            💬 Свяжитесь с нами – мы поможем вам сделать работу с нашей платформой удобной и прибыльной!
                        </p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">Рекомендации для успешных продаж</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>
                            Грамотно заполняйте карточки товаров:
                        </p>
                        <p className='NestedP'>
                            - Указывайте полное название с ключевыми словами (например, «Женский спортивный костюм»).
                        </p>
                        <p className='NestedP'>
                            - Пишите описание с характеристиками и материалом.
                        </p>
                        <p className='NestedP'>
                            - Перечисляйте размеры через запятую: S, M, L, XL.
                        </p>
                        <p className='NestedP'>
                            - Вводите актуальную цену (без комиссии).
                        </p>
                        <p>
                            Используйте качественные фотографии:
                        </p>
                        <p className='NestedP'>
                            - Хорошее освещение, чистый фон , несколько ракурсов.
                        </p>
                        <p>
                            Участвуйте в акциях:
                        </p>
                        <p className='NestedP'>
                            Продвижение через акции помогает увеличить продажи и привлечь новых клиентов.
                        </p>
                    </AccordionDetails>
                </Accordion>
            </div >
        </div >
    )
}

export default FactoryGuide