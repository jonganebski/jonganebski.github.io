use std::borrow::Borrow;
use rand::Rng;
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

struct Node {
    is_veiled: bool,
    is_mine: bool,
    hint: i8,
}

#[wasm_bindgen]
pub fn easy() -> Result<(), JsValue> {
    const TARGET_MINES_COUNT:i32 = 20;
    let mut blue_print: [[bool;8];8] = [[false;8];8];
    let mut mines_count = 0;

    while mines_count < TARGET_MINES_COUNT {
        let col_num = rand::thread_rng().gen_range(0..8);
        let row_num = rand::thread_rng().gen_range(0..8);
        if blue_print[row_num][col_num] == false {
            blue_print[row_num][col_num] = true;
            mines_count += 1;
        }
    }

    let document = web_sys::window().unwrap().document().unwrap();
    
    for row_num in 0..blue_print.len() {
        let row = blue_print[row_num];
        for col_num in 0..row.len() {
            let is_mine = row[col_num];
            let mut hint:i8= 0;
            
            let north = if row_num == 0 { false } else { blue_print[row_num-1][col_num] };
            if north { hint += 1}
            
            let north_east = if row_num == 0 || col_num + 1 >= 8 { false } else { blue_print[row_num-1][col_num + 1] };
            if north_east { hint += 1}
            
            let east = if col_num + 1 >= 8 { false } else { blue_print[row_num][col_num + 1] };
            if east { hint += 1}
            
            let south_east = if col_num + 1 >= 8 || row_num + 1 >=8 { false } else { blue_print[row_num + 1][col_num + 1] };
            if south_east { hint += 1}
            
            let south = if row_num + 1 >=8 { false } else { blue_print[row_num + 1][col_num] };
            if south { hint += 1}
            
            let south_west = if row_num + 1 >=8 || col_num == 0 { false } else { blue_print[row_num + 1][col_num - 1] };
            if south_west { hint += 1}
            
            let west = if col_num == 0 { false } else { blue_print[row_num][col_num - 1] };
            if west { hint += 1}
            
            let north_west = if col_num == 0 || row_num == 0 { false } else { blue_print[row_num - 1][col_num - 1] };
            if north_west { hint += 1}
            
            let node = Node {is_veiled: true, is_mine, hint};

            
            let div = document
            .create_element("div")?
            .dyn_into::<web_sys::HtmlDivElement>()?;
            
            div.set_inner_text(node.is_mine.to_string().borrow());
            div.set_class_name("veiled");
            
            let closure = Closure::wrap(Box::new(move |event: web_sys::MouseEvent| {
                match event.current_target(){
                    Some(current_target) => {
                        let div = current_target.dyn_into::<web_sys::HtmlDivElement>();
                        match div {
                            Ok(div) => {
                                if is_mine {
                                    log("Game Over")
                                }else{
                                    div.set_inner_text(node.hint.to_string().borrow());
                                    div.set_class_name("unveiled");
                                }
                            },
                            Err(_) => ()
                        }
                        
                    },
                    None => ()
                }
            }) as Box<dyn FnMut(_)>);
            
            div.add_event_listener_with_callback("click", closure.as_ref().unchecked_ref())?;
            
            closure.forget();
            
            document.get_element_by_id("wasm").unwrap().append_child(&div)?;
        }
    }

    Ok(())
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
