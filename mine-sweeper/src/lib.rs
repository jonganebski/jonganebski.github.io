use std::borrow::Borrow;
use std::cell::Cell;
use std::rc::Rc;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

#[wasm_bindgen]
pub enum Level {
    Easy = "Easy",
    Moderate = "Moderate",
    Hard = "Hard"
}

#[wasm_bindgen]
pub fn initialize(level: Level) -> Result<(), JsValue> {
    log("FF");

    let document = web_sys::window().unwrap().document().unwrap();
    let size:i16;

    match level {
        Level::Easy => {size = 8 * 8},
        Level::Moderate => {size = 16 * 16},
        Level::Hard => {size = 16 * 30},
        Level::__Nonexhaustive => {size = 8*8}
    }
    
    
    for number in (1..size+1).into_iter() {
        let closure = Closure::wrap(Box::new(move |event: web_sys::MouseEvent| {
            log(number.to_string().borrow())
        }) as Box<dyn FnMut(_)>);
        let div = document
            .create_element("div")?
            .dyn_into::<web_sys::HtmlDivElement>()?;
        div.set_inner_text(number.to_string().borrow());
        div.add_event_listener_with_callback("click", closure.as_ref().unchecked_ref())?;
        closure.forget();
        document.get_element_by_id("wasm").unwrap().append_child(&div)?;
    }



    // canvas.set_width(640);
    // canvas.set_height(480);
    // canvas.style().set_property("border", "solid")?;
    // let context = canvas
    //     .get_context("2d")?
    //     .unwrap()
    //     .dyn_into::<web_sys::CanvasRenderingContext2d>()?;
    // let context = Rc::new(context);
    // let pressed = Rc::new(Cell::new(false));
    // {
    //     let context = context.clone();
    //     let pressed = pressed.clone();
    //     let closure = Closure::wrap(Box::new(move |event: web_sys::MouseEvent| {
    //         context.begin_path();
    //         context.move_to(event.offset_x() as f64, event.offset_y() as f64);
    //         pressed.set(true);
    //     }) as Box<dyn FnMut(_)>);
    //     canvas.add_event_listener_with_callback("mousedown", closure.as_ref().unchecked_ref())?;
    //     closure.forget();
    // }
    // {
    //     let context = context.clone();
    //     let pressed = pressed.clone();
    //     let closure = Closure::wrap(Box::new(move |event: web_sys::MouseEvent| {
    //         if pressed.get() {
    //             context.line_to(event.offset_x() as f64, event.offset_y() as f64);
    //             context.stroke();
    //             context.begin_path();
    //             context.move_to(event.offset_x() as f64, event.offset_y() as f64);
    //         }
    //     }) as Box<dyn FnMut(_)>);
    //     canvas.add_event_listener_with_callback("mousemove", closure.as_ref().unchecked_ref())?;
    //     closure.forget();
    // }
    // {
    //     let context = context.clone();
    //     let pressed = pressed.clone();
    //     let closure = Closure::wrap(Box::new(move |event: web_sys::MouseEvent| {
    //         pressed.set(false);
    //         context.line_to(event.offset_x() as f64, event.offset_y() as f64);
    //         context.stroke();
    //     }) as Box<dyn FnMut(_)>);
    //     canvas.add_event_listener_with_callback("mouseup", closure.as_ref().unchecked_ref())?;
    //     closure.forget();
    // }

    Ok(())
}