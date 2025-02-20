"use client"

import { Button, TextField, ListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../styles/components/_addproduct.scss'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

const flags = {
    "KGS": <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#ea3323"></rect><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path id="1705926025363-423951_path1043" d="M16,23l-.239-2.386c-.008-.08,.02-.162,.082-.214,.037-.031,.088-.055,.157-.053,.102,.002,.164,.057,.2,.111,.032,.048,.045,.106,.039,.164l-.24,2.378h0Zm7-7l-2.386-.239c-.08-.008-.162,.02-.214,.082-.031,.037-.055,.088-.053,.157,.002,.102,.057,.164,.111,.2,.048,.032,.106,.045,.164,.039l2.378-.24h0Zm-.086,1.095l-2.319-.609c-.078-.02-.163-.006-.224,.047-.036,.032-.068,.078-.077,.147-.014,.102,.03,.171,.078,.215,.042,.039,.098,.061,.156,.064l2.387,.135Zm-.257,1.068l-2.195-.964c-.074-.032-.16-.031-.228,.012-.041,.026-.079,.066-.099,.133-.03,.098,.003,.174,.043,.225,.036,.045,.087,.076,.144,.088l2.336,.507Zm-.42,1.015l-2.018-1.296c-.068-.043-.153-.056-.228-.024-.045,.019-.088,.053-.119,.115-.045,.092-.024,.172,.007,.229,.028,.05,.074,.088,.128,.109l2.228,.866h0Zm-.574,.937l-1.79-1.595c-.06-.053-.143-.079-.221-.059-.047,.012-.096,.039-.135,.096-.059,.084-.051,.166-.029,.227,.02,.054,.059,.099,.11,.128l2.065,1.204h0Zm-.713,.834l-1.518-1.856c-.051-.062-.128-.1-.209-.093-.048,.004-.101,.023-.148,.073-.071,.074-.076,.156-.063,.22,.011,.057,.043,.107,.088,.144l1.851,1.512Zm-.835,.713l-1.209-2.07c-.04-.069-.111-.119-.192-.125-.048-.003-.103,.007-.158,.049-.082,.062-.099,.143-.097,.207,.002,.058,.026,.112,.065,.156l1.592,1.783Zm-.937,.574l-.87-2.234c-.029-.075-.091-.135-.17-.153-.047-.011-.103-.009-.164,.024-.091,.048-.121,.125-.128,.189-.007,.057,.008,.115,.039,.164l1.293,2.011Zm-1.015,.42l-.51-2.343c-.017-.079-.069-.148-.144-.178-.045-.018-.1-.025-.166-.002-.097,.033-.139,.105-.156,.167-.016,.056-.01,.115,.013,.168l.963,2.188h0Zm-1.068,.257l-.138-2.394c-.004-.081-.045-.157-.114-.198-.041-.025-.095-.04-.163-.028-.101,.018-.153,.082-.181,.14-.024,.052-.028,.112-.013,.168l.609,2.312Zm-8.095-6.914l2.386-.239c.08-.008,.162,.02,.214,.082,.031,.037,.055,.088,.053,.157-.002,.102-.057,.164-.111,.2-.048,.032-.106,.045-.164,.039l-2.378-.24h0Zm.086-1.095l2.394,.138c.081,.004,.157,.045,.198,.114,.025,.041,.04,.095,.028,.163-.018,.101-.082,.153-.14,.181-.052,.024-.112,.028-.168,.013l-2.312-.609Zm.257-1.068l2.343,.51c.079,.017,.148,.069,.178,.144,.018,.045,.025,.1,.002,.166-.033,.097-.105,.139-.167,.156-.056,.016-.115,.01-.168-.013l-2.188-.963h0Zm.42-1.015l2.234,.87c.075,.029,.135,.091,.153,.17,.011,.047,.009,.103-.024,.164-.048,.091-.125,.121-.189,.128-.057,.007-.115-.008-.164-.039l-2.011-1.293Zm.574-.937l2.07,1.209c.069,.04,.119,.111,.125,.192,.003,.048-.007,.103-.049,.158-.062,.082-.143,.099-.207,.097-.058-.002-.112-.026-.156-.065l-1.783-1.592Zm.713-.835l1.856,1.518c.062,.051,.1,.128,.093,.209-.004,.048-.023,.101-.073,.148-.074,.071-.156,.076-.22,.063-.057-.011-.107-.043-.144-.088l-1.512-1.851Zm.835-.713l1.595,1.79c.053,.06,.079,.143,.059,.221-.012,.047-.039,.096-.096,.135-.084,.059-.166,.051-.227,.029-.054-.02-.099-.059-.128-.11l-1.204-2.065h0Zm.937-.574l1.296,2.018c.043,.068,.056,.153,.024,.228-.019,.045-.053,.088-.115,.119-.092,.045-.172,.024-.229-.007-.05-.028-.088-.074-.109-.128l-.866-2.228h0Zm1.015-.421l.964,2.195c.032,.074,.031,.16-.012,.228-.026,.041-.066,.079-.133,.099-.098,.03-.174-.003-.225-.043-.045-.036-.076-.087-.088-.144l-.507-2.336Zm1.068-.257l.609,2.319c.02,.078,.006,.163-.047,.224-.032,.036-.078,.068-.147,.077-.102,.014-.171-.03-.215-.078-.039-.042-.061-.098-.064-.156l-.135-2.387Zm1.095-.086l.239,2.386c.008,.08-.02,.162-.082,.214-.037,.031-.088,.055-.157,.053-.102-.002-.164-.057-.2-.111-.032-.048-.045-.106-.039-.164l.24-2.378h0Zm-1.095,13.914l.609-2.319c.02-.078,.006-.163-.047-.224-.032-.036-.078-.068-.147-.077-.102-.014-.171,.03-.215,.078-.039,.042-.061,.098-.064,.156l-.135,2.387Zm-1.068-.257l.964-2.195c.032-.074,.031-.16-.012-.228-.026-.041-.066-.079-.133-.099-.098-.03-.174,.003-.225,.043-.045,.036-.076,.087-.088,.144l-.507,2.336Zm-1.015-.42l1.296-2.018c.043-.068,.056-.153,.024-.228-.019-.045-.053-.088-.115-.119-.092-.045-.172-.024-.229,.007-.05,.028-.088,.074-.109,.128l-.866,2.228h0Zm-.937-.574l1.595-1.79c.053-.06,.079-.143,.059-.221-.012-.047-.039-.096-.096-.135-.084-.059-.166-.051-.227-.029-.054,.02-.099,.059-.128,.11l-1.204,2.065h0Zm-.835-.713l1.856-1.518c.062-.051,.1-.128,.093-.209-.004-.048-.023-.101-.073-.148-.074-.071-.156-.076-.22-.063-.057,.011-.107,.043-.144,.088l-1.512,1.851Zm-.713-.835l2.07-1.209c.069-.04,.119-.111,.125-.192,.003-.048-.007-.103-.049-.158-.062-.082-.143-.099-.207-.097-.058,.002-.112,.026-.156,.065l-1.783,1.592Zm-.574-.937l2.234-.87c.075-.029,.135-.091,.153-.17,.011-.047,.009-.103-.024-.164-.048-.091-.125-.121-.189-.128-.057-.007-.115,.008-.164,.039l-2.011,1.293Zm-.42-1.015l2.343-.51c.079-.017,.148-.069,.178-.144,.018-.045,.025-.1,.002-.166-.033-.097-.105-.139-.167-.156-.056-.016-.115-.01-.168,.013l-2.188,.963h0Zm-.257-1.068l2.394-.138c.081-.004,.157-.045,.198-.114,.025-.041,.04-.095,.028-.163-.018-.101-.082-.153-.14-.181-.052-.024-.112-.028-.168-.013l-2.312,.609Zm8.009-8.009l-.138,2.394c-.004,.081-.045,.157-.114,.198-.041,.025-.095,.04-.163,.028-.101-.018-.153-.082-.181-.14-.024-.052-.028-.112-.013-.168l.609-2.312Zm1.068,.257l-.51,2.343c-.017,.079-.069,.148-.144,.178-.045,.018-.1,.025-.166,.002-.097-.033-.139-.105-.156-.167-.016-.056-.01-.115,.013-.168l.963-2.188h0Zm1.015,.42l-.87,2.234c-.029,.075-.091,.135-.17,.153-.047,.011-.103,.009-.164-.024-.091-.048-.121-.125-.128-.189-.007-.057,.008-.115,.039-.164l1.293-2.011Zm.937,.574l-1.209,2.07c-.04,.069-.111,.119-.192,.125-.048,.003-.103-.007-.158-.049-.082-.062-.099-.143-.097-.207,.002-.058,.026-.112,.065-.156l1.592-1.783Zm.835,.713l-1.518,1.856c-.051,.062-.128,.1-.209,.093-.048-.004-.101-.023-.148-.073-.071-.074-.076-.156-.063-.22,.011-.057,.043-.107,.088-.144l1.851-1.512Zm.713,.835l-1.79,1.595c-.06,.053-.143,.079-.221,.059-.047-.012-.096-.039-.135-.096-.059-.084-.051-.166-.029-.227,.02-.054,.059-.099,.11-.128l2.065-1.204h0Zm.574,.937l-2.018,1.296c-.068,.043-.153,.056-.228,.024-.045-.019-.088-.053-.119-.115-.045-.092-.024-.172,.007-.229,.028-.05,.074-.088,.128-.109l2.228-.866h0Zm.42,1.015l-2.195,.964c-.074,.032-.16,.031-.228-.012-.041-.026-.079-.066-.099-.133-.03-.098,.003-.174,.043-.225,.036-.045,.087-.076,.144-.088l2.336-.507Zm.257,1.068l-2.319,.609c-.078,.02-.163,.006-.224-.047-.036-.032-.068-.078-.077-.147-.014-.102,.03-.171,.078-.215,.042-.039,.098-.061,.156-.064l2.387-.135Z" fill="#ff5"></path><circle id="1705926025363-423951_circle1015" cx="16" cy="16" r="4.232" fill="#ff5"></circle><path d="M16,19.616c-1.994,0-3.616-1.622-3.616-3.616s1.622-3.616,3.616-3.616,3.616,1.622,3.616,3.616-1.622,3.616-3.616,3.616Zm0-6.943c-1.834,0-3.327,1.493-3.327,3.327s1.493,3.327,3.327,3.327,3.327-1.493,3.327-3.327-1.493-3.327-3.327-3.327Z" fill="#ea3323"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>,
    "RUB": <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#1435a1" d="M1 11H31V21H1z"></path><path d="M5,4H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" fill="#fff"></path><path d="M5,20H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" transform="rotate(180 16 24)" fill="#c53a28"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>,
    "KZT": <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#4daac1"></rect><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><circle cx="16.008" cy="13.938" r="3.515" fill="#fbec5a"></circle><path id="1705926025362-471600_C" d="M16.008,9.943c.209-.003,.287-.133,.287-.29,0-.209-.287-1.204-.287-1.204,0,0-.287,.995-.287,1.204,0,.157,.078,.29,.287,.29Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-2" d="M20.003,13.938c.003,.209,.133,.287,.29,.287,.209,0,1.204-.287,1.204-.287,0,0-.995-.287-1.204-.287-.157,0-.29,.078-.29,.287Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-3" d="M16.008,17.933c-.209,.003-.287,.133-.287,.29,0,.209,.287,1.204,.287,1.204,0,0,.287-.995,.287-1.204,0-.157-.078-.29-.287-.29Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-4" d="M12.014,13.938c-.003-.209-.133-.287-.29-.287-.209,0-1.204,.287-1.204,.287,0,0,.995,.287,1.204,.287,.157,0,.29-.078,.29-.287Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-5" d="M17.537,10.247c.194,.078,.317-.013,.377-.158,.08-.193,.195-1.223,.195-1.223,0,0-.646,.81-.726,1.003-.06,.145-.039,.298,.155,.378Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-6" d="M19.699,15.467c-.078,.194,.013,.317,.158,.377,.193,.08,1.223,.195,1.223,.195,0,0-.81-.646-1.003-.726-.145-.06-.298-.039-.378,.155Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-7" d="M14.48,17.629c-.194-.078-.317,.013-.377,.158-.08,.193-.195,1.223-.195,1.223,0,0,.646-.81,.726-1.003,.06-.145,.039-.298-.155-.378Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-8" d="M12.318,12.409c.078-.194-.013-.317-.158-.377-.193-.08-1.223-.195-1.223-.195,0,0,.81,.646,1.003,.726,.145,.06,.298,.039,.378-.155Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-9" d="M18.833,11.113c.15,.146,.297,.109,.408-.002,.148-.148,.648-1.055,.648-1.055,0,0-.907,.501-1.055,.648-.111,.111-.15,.26-.002,.408Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-10" d="M18.833,16.763c-.146,.15-.109,.297,.002,.408,.148,.148,1.055,.648,1.055,.648,0,0-.501-.907-.648-1.055-.111-.111-.26-.15-.408-.002Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-11" d="M13.184,16.763c-.15-.146-.297-.109-.408,.002-.148,.148-.648,1.055-.648,1.055,0,0,.907-.501,1.055-.648,.111-.111,.15-.26,.002-.408Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-12" d="M13.184,11.113c.146-.15,.109-.297-.002-.408-.148-.148-1.055-.648-1.055-.648,0,0,.501,.907,.648,1.055,.111,.111,.26,.15,.408,.002Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-13" d="M19.699,12.409c.082,.192,.233,.215,.378,.155,.193-.08,1.003-.726,1.003-.726,0,0-1.03,.115-1.223,.195-.145,.06-.238,.183-.158,.377Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-14" d="M17.537,17.629c-.192,.082-.215,.233-.155,.378,.08,.193,.726,1.003,.726,1.003,0,0-.115-1.03-.195-1.223-.06-.145-.183-.238-.377-.158Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-15" d="M12.318,15.467c-.082-.192-.233-.215-.378-.155-.193,.08-1.003,.726-1.003,.726,0,0,1.03-.115,1.223-.195,.145-.06,.238-.183,.158-.377Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-16" d="M14.48,10.247c.192-.082,.215-.233,.155-.378-.08-.193-.726-1.003-.726-1.003,0,0,.115,1.03,.195,1.223,.06,.145,.183,.238,.377,.158Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-17" d="M16.788,10.02c.206,.038,.308-.075,.338-.228,.041-.205-.047-1.237-.047-1.237,0,0-.476,.92-.517,1.125-.031,.154,.02,.3,.225,.341Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-18" d="M19.927,14.717c-.038,.206,.075,.308,.228,.338,.205,.041,1.237-.047,1.237-.047,0,0-.92-.476-1.125-.517-.154-.031-.3,.02-.341,.225Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-19" d="M15.229,17.856c-.206-.038-.308,.075-.338,.228-.041,.205,.047,1.237,.047,1.237,0,0,.476-.92,.517-1.125,.031-.154-.02-.3-.225-.341Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-20" d="M12.09,13.159c.038-.206-.075-.308-.228-.338-.205-.041-1.237,.047-1.237,.047,0,0,.92,.476,1.125,.517,.154,.031,.3-.02,.341-.225Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-21" d="M18.228,10.616c.175,.114,.313,.049,.4-.081,.116-.174,.43-1.161,.43-1.161,0,0-.792,.668-.908,.842-.087,.13-.096,.285,.078,.401Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-22" d="M19.33,16.157c-.114,.175-.049,.313,.081,.4,.174,.116,1.161,.43,1.161,.43,0,0-.668-.792-.842-.908-.13-.087-.285-.096-.401,.078Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-23" d="M13.789,17.259c-.175-.114-.313-.049-.4,.081-.116,.174-.43,1.161-.43,1.161,0,0,.792-.668,.908-.842,.087-.13,.096-.285-.078-.401Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-24" d="M12.687,11.718c.114-.175,.049-.313-.081-.4-.174-.116-1.161-.43-1.161-.43,0,0,.668,.792,.842,.908,.13,.087,.285,.096,.401-.078Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-25" d="M19.33,11.718c.118,.172,.27,.165,.401,.078,.174-.116,.842-.908,.842-.908,0,0-.987,.314-1.161,.43-.13,.087-.198,.226-.081,.4Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-26" d="M18.228,17.259c-.172,.118-.165,.27-.078,.401,.116,.174,.908,.842,.908,.842,0,0-.314-.987-.43-1.161-.087-.13-.226-.198-.4-.081Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-27" d="M12.687,16.157c-.118-.172-.27-.165-.401-.078-.174,.116-.842,.908-.842,.908,0,0,.987-.314,1.161-.43,.13-.087,.198-.226,.081-.4Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-28" d="M13.789,10.616c.172-.118,.165-.27,.078-.401-.116-.174-.908-.842-.908-.842,0,0,.314,.987,.43,1.161,.087,.13,.226,.198,.4,.081Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-29" d="M19.927,13.159c.043,.204,.187,.256,.341,.225,.205-.041,1.125-.517,1.125-.517,0,0-1.032-.088-1.237-.047-.154,.031-.269,.133-.228,.338Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-30" d="M16.788,17.856c-.204,.043-.256,.187-.225,.341,.041,.205,.517,1.125,.517,1.125,0,0,.088-1.032,.047-1.237-.031-.154-.133-.269-.338-.228Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-31" d="M12.09,14.717c-.043-.204-.187-.256-.341-.225-.205,.041-1.125,.517-1.125,.517,0,0,1.032,.088,1.237,.047,.154-.031,.269-.133,.228-.338Z" fill="#fbec5a"></path><path id="1705926025362-471600_C-32" d="M15.229,10.02c.204-.043,.256-.187,.225-.341-.041-.205-.517-1.125-.517-1.125,0,0-.088,1.032-.047,1.237,.031,.154,.133,.269,.338,.228Z" fill="#fbec5a"></path><path d="M15.381,21.553c-.262,.013-.507,.122-.768,.141,.066,.178-.157,.336-.296,.202-.098,.031-.199,.01-.283-.047-.326,.126-.438,.672-.027,.357,.107-.068-.045,.155,.03,.106,.824-.278,1.811-.053,2.646-.147-.529-.098-1.111-.035-1.617-.133,.061-.084,.134-.159,.201-.237-.054-.009-.106-.02-.16-.033,.095-.065,.183-.139,.275-.209h0Z" fill="#fbec5a"></path><path d="M19.45,22.456c-.189,.114-.334-.088-.492-.148-.118,.163-.393,.721-.499,.182-.151,.127-.227,.416-.472,.377-.259-.468-.364,.332-.654,.034-.031-.147-.104-.32-.184-.086-.055,.165-.231,.287-.402,.214-.093-.076,.075-.359-.044-.339-.178,.117-.281,.409-.529,.386-.096-.108,.058-.291-.047-.411-.125,.16-.263,.394-.479,.411-.104-.084,.004-.327-.062-.362-.221,.133-.455,.369-.733,.295,.506-1.083,2.024-.344,2.918-.762,.102-.062,.349-.15,.261-.294-.078-.114,.203-.069,.23-.202,.454-.447,1.524,.043,2.172-.03,.048,.309-.295,.527-.572,.431-.132,.021-.33-.303-.291-.067-.027,.124-.008,.288-.121,.371m-5.419-.634c.903,.018,1.617-1.001,2.425-1.321,.631-.191,1.302-.168,1.936-.344,.482-.66,1.302-.896,1.988-1.276,.543-.535,1.009-1.606,1.968-1.467-.016,.269-.171,.508-.357,.694,.153-.003,.284-.1,.438-.094,.053,.276-.246,.421-.404,.593,.712,.068-.308,.378-.479,.6,.484,.095-.338,.196-.323,.398,.256,.242-.684,.209-.273,.448-.082,.124-.258,.15-.401,.138,.141,.615-.997,.841-1.476,.944,.511,.124,2.837-.423,1.76-.831,.297-.183,.671-.118,.99-.227,.008-.103-.243-.075-.336-.098-.494-.098,.712-.163,.815-.36-.186-.086-.421-.01-.62-.081,.246-.068,1.587-.465,.77-.486-.187,.033-.273-.057-.061-.134,.722-.438,2.066-1.473,.262-.802,1.482-1.119,2.217-2.57,.007-.62,1.379-1.223,1.922-3.365-.02-.741,1.057-1.83,.701-3.668-.249-.492,.117-.273,.256-1.744-.197-1.117-.529,2.79-3.132,4.783-5.896,4.945-.563,.859-1.624,1.121-2.265,1.732" fill="#fbec5a"></path><path d="M15.886,20.076c-.091,.166-.145,.357-.263,.505-.662-.588-1.712-.067-2.375-.651-1.256-.909-2.379-1.756-3.421-2.935-.105,.026-.057,.252-.186,.136-.07-.05-.244-.054-.26,.015,.158,.208,.316,.445,.338,.711-.108,.011-.299-.023-.352,.017,.143,.214,.326,.404,.534,.556-.1,.016-.297,.007-.335,.048,.207,.168,.428,.341,.699,.384,.055,.073-.081,.214,.034,.276,.066,.027,.286,.073,.135,.148-.252,.26,.305,.231,.354,.357-.475,.25,.258,.394,.495,.412-.105,.089-.235,.139-.344,.222,.683,.379,1.438,.647,2.197,.829-.98-.036-1.846-.517-2.743-.856,.135-.07,.291-.087,.431-.148-.291-.058-.608-.077-.864-.237,.039-.07,.188-.073,.27-.109,.474-.133-.527-.11-.633-.261,.11-.124,.458-.045,.6-.189-.79-.158-1.694-.405-.236-.398-.761-.21-2.478-1.49-.648-.776-1.235-.994-2.378-2.729-.04-.667-1.008-.899-2.122-3.554,.088-.708-1.053-1.834-.715-3.71,.249-.492-.471-3.981,.959,4.279,6.275,3.808" fill="#fbec5a"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
    ,
    "UZS": <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#fff" d="M1 11H31V21H1z"></path><path d="M5,4H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" fill="#4498b3"></path><path d="M5,20H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" transform="rotate(180 16 24)" fill="#55b44b"></path><path fill="#be2a2c" d="M1 12H31V13H1z"></path><path fill="#be2a2c" d="M1 19H31V20H1z"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path d="M7.417,6.51c-.127-.021-.257-.033-.39-.033-1.291,0-2.338,1.047-2.338,2.338s1.047,2.338,2.338,2.338c.133,0,.263-.012,.39-.033-1.105-.186-1.948-1.146-1.948-2.305s.843-2.119,1.948-2.305Z" fill="#fff"></path><path fill="#fff" d="M9.741 10.181L9.564 9.635 9.387 10.181 8.813 10.181 9.277 10.518 9.1 11.063 9.564 10.726 10.028 11.063 9.851 10.518 10.315 10.181 9.741 10.181z"></path><path fill="#fff" d="M12.899 10.181L12.722 9.635 12.544 10.181 11.971 10.181 12.435 10.518 12.258 11.063 12.722 10.726 13.186 11.063 13.009 10.518 13.473 10.181 12.899 10.181z"></path><path fill="#fff" d="M12.722 6.477L12.544 7.023 11.971 7.023 12.435 7.36 12.258 7.905 12.722 7.568 13.186 7.905 13.009 7.36 13.473 7.023 12.899 7.023 12.722 6.477z"></path></svg>
    ,
    "USD": <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect><path d="M1.638,5.846H30.362c-.711-1.108-1.947-1.846-3.362-1.846H5c-1.414,0-2.65,.738-3.362,1.846Z" fill="#a62842"></path><path d="M2.03,7.692c-.008,.103-.03,.202-.03,.308v1.539H31v-1.539c0-.105-.022-.204-.03-.308H2.03Z" fill="#a62842"></path><path fill="#a62842" d="M2 11.385H31V13.231H2z"></path><path fill="#a62842" d="M2 15.077H31V16.923000000000002H2z"></path><path fill="#a62842" d="M1 18.769H31V20.615H1z"></path><path d="M1,24c0,.105,.023,.204,.031,.308H30.969c.008-.103,.031-.202,.031-.308v-1.539H1v1.539Z" fill="#a62842"></path><path d="M30.362,26.154H1.638c.711,1.108,1.947,1.846,3.362,1.846H27c1.414,0,2.65-.738,3.362-1.846Z" fill="#a62842"></path><path d="M5,4h11v12.923H1V8c0-2.208,1.792-4,4-4Z" fill="#102d5e"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path fill="#fff" d="M4.601 7.463L5.193 7.033 4.462 7.033 4.236 6.338 4.01 7.033 3.279 7.033 3.87 7.463 3.644 8.158 4.236 7.729 4.827 8.158 4.601 7.463z"></path><path fill="#fff" d="M7.58 7.463L8.172 7.033 7.441 7.033 7.215 6.338 6.989 7.033 6.258 7.033 6.849 7.463 6.623 8.158 7.215 7.729 7.806 8.158 7.58 7.463z"></path><path fill="#fff" d="M10.56 7.463L11.151 7.033 10.42 7.033 10.194 6.338 9.968 7.033 9.237 7.033 9.828 7.463 9.603 8.158 10.194 7.729 10.785 8.158 10.56 7.463z"></path><path fill="#fff" d="M6.066 9.283L6.658 8.854 5.927 8.854 5.701 8.158 5.475 8.854 4.744 8.854 5.335 9.283 5.109 9.979 5.701 9.549 6.292 9.979 6.066 9.283z"></path><path fill="#fff" d="M9.046 9.283L9.637 8.854 8.906 8.854 8.68 8.158 8.454 8.854 7.723 8.854 8.314 9.283 8.089 9.979 8.68 9.549 9.271 9.979 9.046 9.283z"></path><path fill="#fff" d="M12.025 9.283L12.616 8.854 11.885 8.854 11.659 8.158 11.433 8.854 10.702 8.854 11.294 9.283 11.068 9.979 11.659 9.549 12.251 9.979 12.025 9.283z"></path><path fill="#fff" d="M6.066 12.924L6.658 12.494 5.927 12.494 5.701 11.799 5.475 12.494 4.744 12.494 5.335 12.924 5.109 13.619 5.701 13.19 6.292 13.619 6.066 12.924z"></path><path fill="#fff" d="M9.046 12.924L9.637 12.494 8.906 12.494 8.68 11.799 8.454 12.494 7.723 12.494 8.314 12.924 8.089 13.619 8.68 13.19 9.271 13.619 9.046 12.924z"></path><path fill="#fff" d="M12.025 12.924L12.616 12.494 11.885 12.494 11.659 11.799 11.433 12.494 10.702 12.494 11.294 12.924 11.068 13.619 11.659 13.19 12.251 13.619 12.025 12.924z"></path><path fill="#fff" d="M13.539 7.463L14.13 7.033 13.399 7.033 13.173 6.338 12.947 7.033 12.216 7.033 12.808 7.463 12.582 8.158 13.173 7.729 13.765 8.158 13.539 7.463z"></path><path fill="#fff" d="M4.601 11.104L5.193 10.674 4.462 10.674 4.236 9.979 4.01 10.674 3.279 10.674 3.87 11.104 3.644 11.799 4.236 11.369 4.827 11.799 4.601 11.104z"></path><path fill="#fff" d="M7.58 11.104L8.172 10.674 7.441 10.674 7.215 9.979 6.989 10.674 6.258 10.674 6.849 11.104 6.623 11.799 7.215 11.369 7.806 11.799 7.58 11.104z"></path><path fill="#fff" d="M10.56 11.104L11.151 10.674 10.42 10.674 10.194 9.979 9.968 10.674 9.237 10.674 9.828 11.104 9.603 11.799 10.194 11.369 10.785 11.799 10.56 11.104z"></path><path fill="#fff" d="M13.539 11.104L14.13 10.674 13.399 10.674 13.173 9.979 12.947 10.674 12.216 10.674 12.808 11.104 12.582 11.799 13.173 11.369 13.765 11.799 13.539 11.104z"></path><path fill="#fff" d="M4.601 14.744L5.193 14.315 4.462 14.315 4.236 13.619 4.01 14.315 3.279 14.315 3.87 14.744 3.644 15.44 4.236 15.01 4.827 15.44 4.601 14.744z"></path><path fill="#fff" d="M7.58 14.744L8.172 14.315 7.441 14.315 7.215 13.619 6.989 14.315 6.258 14.315 6.849 14.744 6.623 15.44 7.215 15.01 7.806 15.44 7.58 14.744z"></path><path fill="#fff" d="M10.56 14.744L11.151 14.315 10.42 14.315 10.194 13.619 9.968 14.315 9.237 14.315 9.828 14.744 9.603 15.44 10.194 15.01 10.785 15.44 10.56 14.744z"></path><path fill="#fff" d="M13.539 14.744L14.13 14.315 13.399 14.315 13.173 13.619 12.947 14.315 12.216 14.315 12.808 14.744 12.582 15.44 13.173 15.01 13.765 15.44 13.539 14.744z"></path></svg>
    ,
    "EUR": <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#112f95"></rect><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path fill="#f6cd46" d="M16 8.167L15.745 8.951 14.921 8.951 15.588 9.435 15.333 10.219 16 9.735 16.667 10.219 16.412 9.435 17.079 8.951 16.255 8.951 16 8.167z"></path><path fill="#f6cd46" d="M16.255 22.565L16 21.781 15.745 22.565 14.921 22.565 15.588 23.049 15.333 23.833 16 23.349 16.667 23.833 16.412 23.049 17.079 22.565 16.255 22.565z"></path><path fill="#f6cd46" d="M9.193 16.542L9.86 17.026 9.605 16.242 10.272 15.758 9.448 15.758 9.193 14.974 8.938 15.758 8.114 15.758 8.781 16.242 8.526 17.026 9.193 16.542z"></path><path fill="#f6cd46" d="M12.596 9.079L12.342 9.863 11.517 9.863 12.184 10.347 11.93 11.131 12.596 10.647 13.263 11.131 13.009 10.347 13.675 9.863 12.851 9.863 12.596 9.079z"></path><path fill="#f6cd46" d="M10.105 11.57L9.85 12.354 9.026 12.354 9.693 12.839 9.438 13.623 10.105 13.138 10.772 13.623 10.517 12.839 11.184 12.354 10.36 12.354 10.105 11.57z"></path><path fill="#f6cd46" d="M10.36 19.161L10.105 18.377 9.85 19.161 9.026 19.161 9.693 19.646 9.438 20.43 10.105 19.945 10.772 20.43 10.517 19.646 11.184 19.161 10.36 19.161z"></path><path fill="#f6cd46" d="M12.851 21.653L12.596 20.869 12.342 21.653 11.517 21.653 12.184 22.137 11.93 22.921 12.596 22.437 13.263 22.921 13.009 22.137 13.675 21.653 12.851 21.653z"></path><path fill="#f6cd46" d="M23.886 15.758L23.062 15.758 22.807 14.974 22.552 15.758 21.728 15.758 22.395 16.242 22.14 17.026 22.807 16.542 23.474 17.026 23.219 16.242 23.886 15.758z"></path><path fill="#f6cd46" d="M19.404 9.079L19.149 9.863 18.325 9.863 18.991 10.347 18.737 11.131 19.404 10.647 20.07 11.131 19.816 10.347 20.483 9.863 19.658 9.863 19.404 9.079z"></path><path fill="#f6cd46" d="M21.483 12.839L21.228 13.623 21.895 13.138 22.562 13.623 22.307 12.839 22.974 12.354 22.15 12.354 21.895 11.57 21.64 12.354 20.816 12.354 21.483 12.839z"></path><path fill="#f6cd46" d="M22.15 19.161L21.895 18.377 21.64 19.161 20.816 19.161 21.483 19.646 21.228 20.43 21.895 19.945 22.562 20.43 22.307 19.646 22.974 19.161 22.15 19.161z"></path><path fill="#f6cd46" d="M19.658 21.653L19.404 20.869 19.149 21.653 18.325 21.653 18.991 22.137 18.737 22.921 19.404 22.437 20.07 22.921 19.816 22.137 20.483 21.653 19.658 21.653z"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
}

function Currency() {
    const [isOpen, setIsOpen] = useState(false)
    const [currency, setCurrency] = useState("RUB")

    useEffect(() => {
        setCurrency(localStorage?.getItem("CURRENCY"));
    }, [localStorage?.getItem("CURRENCY")])

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setIsOpen(open);
    };

    const handleListItemClick = (currency) => {
        switch (currency) {
            case "KGS":
                localStorage.setItem("CURRENCY", currency)
                break;
            case "RUB":
                localStorage.setItem("CURRENCY", currency)
                break;
            case "KZT":
                localStorage.setItem("CURRENCY", currency)
                break;
            case "UZS":
                localStorage.setItem("CURRENCY", currency)
                break;
            case "USD":
                localStorage.setItem("CURRENCY", currency)
                break;
            case "EUR":
                localStorage.setItem("CURRENCY", currency)
                break;
            default:
                localStorage.setItem("CURRENCY", "KGS")
        }

        setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };



    return (
        <div className='option' onClick={() => setIsOpen(true)}>
            <div className='current_currency'>
                <p>
                    Валюта
                </p>
                
                <div className='current_currency_sign'>
                {
                    flags[currency]
                }
                    {currency}
                </div>
            </div>
            <SwipeableDrawer
                anchor="bottom"
                open={isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                PaperProps={{
                    sx: { height: '65vh' }
                }}
            >
                <div
                    role="presentation"
                >
                    
                    <ListItem sx={{ width: "auto", display: "flex", gap: 2 }} onClick={() => handleListItemClick("KGS")}>
                        <div className='currency_ly'>
                            
                            {
                                flags.KGS
                            }
                            <p className='current_sign'>
                                KGS
                            </p>
                            <p className='current_char'>
                                Кыргызский сом
                            </p>
                        </div>
                    </ListItem>
                    <ListItem sx={{ width: "auto", display: "flex", gap: 2 }} onClick={() => handleListItemClick("RUB")}>
                        <div className='currency_ly'>
                            {
                                flags.RUB
                            }
                            <p className='current_sign'>
                                RUB
                            </p>
                            <p className='current_char' >
                                Российский рубль
                            </p>
                        </div>
                    </ListItem>
                    <ListItem sx={{ width: "auto", display: "flex", gap: 2 }} onClick={() => handleListItemClick("KZT")}>
                        <div className='currency_ly'>
                            {
                                flags.KZT
                            }
                            <p className='current_sign'>
                                KZT
                            </p>
                            <p className='current_char'>
                                Казахстанский тенге
                            </p>
                        </div>
                    </ListItem>

                    <ListItem sx={{ width: "auto", display: "flex", gap: 2 }} onClick={() => handleListItemClick("UZS")}>
                        <div className='currency_ly'>
                            {
                                flags.UZS
                            }
                            <p className='current_sign'>
                                UZS
                            </p>
                            <p className='current_char' >
                                Узбекский сум
                            </p>
                        </div>
                    </ListItem>



                    <ListItem sx={{ width: "auto", display: "flex", gap: 2 }} onClick={() => handleListItemClick("USD")}>
                        <div className='currency_ly'>
                            {
                                flags.USD
                            }

                            <p className='current_sign'>
                                USD
                            </p>
                            <p className='current_char' >
                                Американский доллар
                            </p>
                        </div>
                    </ListItem>



                    <ListItem sx={{ width: "auto", display: "flex", gap: 2 }} onClick={() => handleListItemClick("EUR")}>
                        <div className='currency_ly'>
                            {
                                flags.EUR
                            }
                            <p className='current_sign'>
                                EUR
                            </p>
                            <p className='current_char'>
                                Евро
                            </p>
                        </div>
                    </ListItem>
                </div>
            </SwipeableDrawer>
        </div>
    )
}

export default Currency